import openApiConverter from "./openApiConverter.js";

const OPENAI_API_KEY = "dummy-api-key";

class SemanticActionsService {
  constructor() {
    // Load system prompt and configuration from OpenAPI spec
    this.systemPrompt = openApiConverter.getSystemPrompt();
    this.openAiConfig = openApiConverter.getOpenAIConfig();
    this.functions = openApiConverter.getFunctions();
  }

  async processUserInput(userInput) {
    const openAiResult = await this.processWithOpenAIFunctions(userInput);
    if (openAiResult) {
      return openAiResult;
    }
  }

  async processWithOpenAIFunctions(userInput) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: this.openAiConfig.model,
        messages: [
          {
            role: "system",
            content: this.systemPrompt,
          },
          {
            role: "user",
            content: userInput,
          },
        ],
        functions: this.functions, // Functions loaded from OpenAPI YAML
        function_call: "auto", // Let OpenAI decide which function to call
        temperature: this.openAiConfig.temperature,
        max_tokens: this.openAiConfig.max_tokens,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const message = data.choices[0]?.message;

    // Check if OpenAI called a function
    if (message?.function_call) {
      const functionName = message.function_call.name;
      const functionArgs = JSON.parse(message.function_call.arguments || "{}");

      return this.executeFunctionCall(functionName, functionArgs, userInput);
    }

    // If no function was called, return a general response
    return {
      success: false,
      response:
        message?.content ||
        "I'm not sure how to help with that. Try asking me to show products, orders, or your profile.",
    };
  }

  executeFunctionCall(functionName, args, originalInput) {
    // Get action configuration from OpenAPI converter
    const actionConfig = openApiConverter.getActionConfig(functionName);

    if (actionConfig.action === "unknown") {
      return {
        success: false,
        response: `Unknown function: ${functionName}`,
      };
    }

    // Generate response based on action type
    let response;

    switch (actionConfig.action) {
      case "navigation":
        response = `Sure! I'll take you to the ${actionConfig.target.replace(
          "/",
          ""
        )} page.`;
        break;
    }

    return {
      success: true,
      action: actionConfig.action,
      target: actionConfig.target,
      response,
    };
  }

  executeAction(actionResult) {
    if (!actionResult.success) {
      return;
    }

    const { action, target } = actionResult;

    // Dispatch action via the MFE event bus
    switch (action) {
      case "navigation":
        window.mfeEventBus.emit("natasha:navigate", { path: target });
        break;
    }
  }
}

export default SemanticActionsService;
