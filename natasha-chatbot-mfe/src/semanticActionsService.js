import openApiSpec from "./openai.json";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

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

  // this should be actually called in nodejs server since we cannot expose the api key to the client
  // openai.json specs and openai api calls should be part of server side
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

        /**
        We can also have direct function definitions in a .js file instead of using openai.json and then convert it to functions array
        Example of direct function definitions -> this.functions
        this.functions = [
          {
            name: "navigate",
            description: "Navigate to different sections of the app",
            parameters: {
              type: "object",
              properties: {
                destination: {
                  type: "string",
                  description: "Where the user wants to go (products, orders, etc.)",
                  enum: ["products", "orders"]
                },
                userQuery: {
                  type: "string", 
                  description: "The original user query",
                  example: "show me products"
                }
              },
              required: ["destination", "userQuery"]
            }
          },
          {
            name: "updateUserProfile",
            description: "Update user profile information",
            parameters: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: "User's full name"
                },
                email: {
                  type: "string",
                  description: "User's email address"
                }
              },
              required: ["name"]
            }
          }
        ]
        */
        tools: this.functions.map((func) => ({
          type: "function",
          function: func,
        })),
        tool_choice: "auto",
        temperature: this.openAiConfig.temperature,
        max_tokens: this.openAiConfig.max_tokens,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const message = data.choices[0]?.message;

    // Check if OpenAI called a tool
    if (message?.tool_calls && message.tool_calls.length > 0) {
      const toolCall = message.tool_calls[0];
      const functionName = toolCall.function.name;
      const functionArgs = JSON.parse(toolCall.function.arguments || "{}");

      return this.executeFunctionCall(functionName, functionArgs, userInput);
    }

    // If no function was called, return a general response
    return {
      success: false,
      response:
        message?.content ||
        "I'm not sure how to help with that. Try asking me to show products, orders, your profile, or update your profile information.",
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
    let updates = {};

    switch (actionConfig.action) {
      case "navigation":
        let target = "/";
        if (args.destination) {
          target = `/${args.destination}`;
        }
        response = `Sure! I'll take you to the ${
          args.destination || "main"
        } section.`;
        // Add target to the result for the executeAction method
        actionConfig.target = target;
        break;
      case "update_profile":
        if (args.name) {
          updates.name = args.name;
        }
        if (args.email) {
          updates.email = args.email;
        }

        const updatedFields = Object.keys(updates);
        if (updatedFields.length > 0) {
          if (updatedFields.length === 1) {
            response = `Perfect! I'll update your ${updatedFields[0]} to "${
              updates[updatedFields[0]]
            }".`;
          } else {
            response = `Great! I'll update your ${updatedFields.join(
              " and "
            )} for you.`;
          }
        } else {
          response =
            "I didn't detect any specific profile changes to make. Please specify what you'd like to update (name or email).";
        }
        break;
      default:
        response = "Action completed successfully.";
    }

    return {
      success: true,
      action: actionConfig.action,
      target: actionConfig.target,
      updates: updates,
      response,
    };
  }

  executeAction(actionResult) {
    if (!actionResult.success) {
      return;
    }

    const { action, target, updates } = actionResult;

    // Dispatch action via the MFE event bus
    switch (action) {
      case "navigation":
        window.mfeEventBus.emit("natasha:navigate", { path: target });
        break;
      case "update_profile":
        // Emit profile update event with the updates
        window.mfeEventBus.emit("natasha:update_profile", { updates });
        break;
    }
  }
}

export default SemanticActionsService;
