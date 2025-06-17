import openApiSpec from "./openai.json";

const OPENAI_API_KEY = "dummy-api-key";

class SemanticActionsService {
  constructor() {
    // Extract data from OpenAPI spec
    this.systemPrompt = openApiSpec["x-system-prompt"];
    this.openAiConfig = openApiSpec["x-openai-config"];
    this.actionMap = openApiSpec["x-action-map"];
    this.functions = this.extractFunctionsFromOpenAPI(openApiSpec);
  }

  /**
   * Convert OpenAPI paths to OpenAI function format
   */
  extractFunctionsFromOpenAPI(spec) {
    const functions = [];

    for (const [path, pathConfig] of Object.entries(spec.paths)) {
      for (const [method, operation] of Object.entries(pathConfig)) {
        if (method.toLowerCase() === "post" && operation.operationId) {
          const functionDef = {
            name: operation.operationId,
            description: operation.summary || operation.description || "",
          };

          // Extract parameters from requestBody schema
          if (operation.requestBody?.content?.["application/json"]?.schema) {
            const schema =
              operation.requestBody.content["application/json"].schema;
            functionDef.parameters = {
              type: "object",
              properties: schema.properties || {},
              required: schema.required || [],
            };
          }

          functions.push(functionDef);
        }
      }
    }

    return functions;
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
        functions: this.functions,
        function_call: "auto",
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
    // Get action configuration from action map
    const actionConfig = this.actionMap[functionName];

    if (!actionConfig) {
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
      case "display_info":
        response = "Here's your profile information.";
        break;
      default:
        response = "Action completed successfully.";
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
      case "display_info":
        window.mfeEventBus.emit("natasha:show_profile", {});
        break;
    }
  }
}

export default SemanticActionsService;
