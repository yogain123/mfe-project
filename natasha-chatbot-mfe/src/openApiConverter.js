/**
 * OpenAPI to OpenAI Function Converter
 * Converts OpenAPI 3.0 specification to OpenAI function calling format
 * This is the industry-standard approach
 */

import yaml from "js-yaml";
import openApiSpec from "./openai.yml"; // Import YAML as raw text

class OpenApiConverter {
  constructor() {
    this.spec = null;
    this.functions = [];
    this.actionMap = {}; // Store action mappings extracted from YAML
    this.loadSpec();
  }

  /**
   * Load and parse the OpenAPI specification
   */
  loadSpec() {
    try {
      this.spec = yaml.load(openApiSpec);
      this.functions = this.convertToOpenAIFunctions();
      this.buildActionMap(); // Build action map from YAML responses
      console.log(
        "🔧 OpenAPI spec loaded and converted to OpenAI functions:",
        this.functions.length
      );
    } catch (error) {
      console.error("❌ Failed to load OpenAPI spec:", error);
      throw error;
    }
  }

  /**
   * Build action map from OpenAPI response schemas
   */
  buildActionMap() {
    if (!this.spec?.paths) {
      return;
    }

    for (const [path, pathConfig] of Object.entries(this.spec.paths)) {
      for (const [method, operation] of Object.entries(pathConfig)) {
        if (method.toLowerCase() === "post" && operation.operationId) {
          // Extract action config from response schema examples
          const responseSchema =
            operation.responses?.["200"]?.content?.["application/json"]?.schema;
          if (responseSchema?.properties) {
            const actionExample = responseSchema.properties.action?.example;
            const targetExample = responseSchema.properties.target?.example;

            if (actionExample && targetExample) {
              this.actionMap[operation.operationId] = {
                action: actionExample,
                target: targetExample,
              };
            }
          }
        }
      }
    }

    console.log("🔧 Action map built from YAML:", this.actionMap);
  }

  /**
   * Convert OpenAPI paths to OpenAI function definitions
   * @returns {Array} Array of OpenAI function definitions
   */
  convertToOpenAIFunctions() {
    if (!this.spec?.paths) {
      throw new Error("No paths found in OpenAPI spec");
    }

    const functions = [];

    for (const [path, pathConfig] of Object.entries(this.spec.paths)) {
      for (const [method, operation] of Object.entries(pathConfig)) {
        if (method.toLowerCase() === "post" && operation.operationId) {
          const functionDef = this.convertOperationToFunction(operation);
          if (functionDef) {
            functions.push(functionDef);
          }
        }
      }
    }

    return functions;
  }

  /**
   * Convert a single OpenAPI operation to OpenAI function definition
   * @param {Object} operation - OpenAPI operation object
   * @returns {Object} OpenAI function definition
   */
  convertOperationToFunction(operation) {
    try {
      const functionDef = {
        name: operation.operationId,
        description: operation.summary || operation.description || "",
      };

      // Extract parameters from requestBody schema
      if (operation.requestBody?.content?.["application/json"]?.schema) {
        const schema = operation.requestBody.content["application/json"].schema;
        functionDef.parameters = {
          type: "object",
          properties: schema.properties || {},
          required: schema.required || [],
        };
      } else {
        // Default parameters if none specified
        functionDef.parameters = {
          type: "object",
          properties: {
            userQuery: {
              type: "string",
              description: "The original user query",
            },
          },
          required: ["userQuery"],
        };
      }

      return functionDef;
    } catch (error) {
      console.error(
        `❌ Failed to convert operation ${operation.operationId}:`,
        error
      );
      return null;
    }
  }

  /**
   * Get OpenAI function definitions
   * @returns {Array} Array of function definitions for OpenAI
   */
  getFunctions() {
    return this.functions;
  }

  /**
   * Get system prompt from OpenAPI spec
   * @returns {string} System prompt
   */
  getSystemPrompt() {
    return (
      this.spec?.["x-system-prompt"] ||
      "You are a helpful AI assistant. Use the provided functions to handle user requests."
    );
  }

  /**
   * Get OpenAI configuration from spec
   * @returns {Object} OpenAI configuration
   */
  getOpenAIConfig() {
    return (
      this.spec?.["x-openai-config"] || {
        model: "gpt-3.5-turbo",
        temperature: 0.7,
        max_tokens: 150,
      }
    );
  }

  /**
   * Map OpenAPI operationId to action configuration
   * Now extracts from YAML response schemas instead of hardcoding
   * @param {string} operationId - The operation ID from OpenAPI
   * @returns {Object} Action configuration
   */
  getActionConfig(operationId) {
    // Return action config extracted from YAML, or unknown if not found
    return (
      this.actionMap[operationId] || { action: "unknown", target: "unknown" }
    );
  }

  /**
   * Get all available operation IDs from the YAML
   * @returns {Array} Array of operation IDs
   */
  getAvailableOperations() {
    return Object.keys(this.actionMap);
  }
}

// Create singleton instance
const openApiConverter = new OpenApiConverter();

export default openApiConverter;
