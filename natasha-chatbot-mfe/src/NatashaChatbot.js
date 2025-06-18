import React, { useState, useEffect } from "react";
import SemanticActionsService from "./semanticActionsService";
import "./styles.css";

const NatashaChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "Hi! I'm Natasha, your AI assistant. I can help you navigate the app and update your profile, try asking me to navigate to products or orders, or update your profile! all just in natural language!",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [user, setUser] = useState(null);

  const semanticService = new SemanticActionsService();

  // Get user data from global context
  useEffect(() => {
    if (window.mfeGlobalContext) {
      setUser(window.mfeGlobalContext.user);
    }

    // Listen for user updates
    if (window.mfeEventBus) {
      const unsubscribe = window.mfeEventBus.on(
        "user:updated",
        (updatedUser) => {
          setUser(updatedUser);
        }
      );

      return unsubscribe;
    }
  }, []);

  // Handle user input
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isProcessing) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      text: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsProcessing(true);

    try {
      // Process with semantic actions service
      const actionResult = await semanticService.processUserInput(
        userMessage.text
      );

      // Execute the action if successful
      if (actionResult.success) {
        semanticService.executeAction(actionResult);
      }

      // Add bot response
      const botMessage = {
        id: Date.now() + 1,
        type: "bot",
        text: actionResult.response,
        timestamp: new Date(),
        action: actionResult.success ? actionResult.action : null,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error processing message:", error);

      const errorMessage = {
        id: Date.now() + 1,
        type: "bot",
        text: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Removed quick action buttons as per user request

  return (
    <div className={`natasha-chatbot ${isOpen ? "open" : "closed"}`}>
      {/* Chatbot Toggle Button */}
      <button
        className="natasha-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Natasha Chatbot"
      >
        {isOpen ? "✕" : "👩‍💻"}
        <span className="toggle-text">{isOpen ? "Close" : "Natasha"}</span>
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="natasha-window">
          {/* Header */}
          <div className="natasha-header">
            <div className="header-info">
              <span className="bot-avatar">👩‍💻</span>
              <div>
                <h3>Natasha</h3>
                <p>AI Assistant with Semantic Actions</p>
              </div>
            </div>
            <div className="header-status">
              {user && (
                <span className="user-indicator">
                  {user.avatar} {user.name}
                </span>
              )}
            </div>
          </div>

          {/* Messages */}
          <div className="natasha-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.type}`}>
                <div className="message-content">
                  <div className="message-text">{message.text}</div>
                  <div className="message-time">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}

            {isProcessing && (
              <div className="message bot">
                <div className="message-content">
                  <div className="message-text">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions removed as per user request */}

          {/* Input */}
          <div className="natasha-input">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything... (e.g., 'show me products')"
              disabled={isProcessing}
              rows={1}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isProcessing}
              className="send-btn"
            >
              {isProcessing ? "⏳" : "📤"}
            </button>
          </div>

          {/* MFE Info */}
          <div className="natasha-footer">
            <span>👩‍💻 Natasha Chatbot MFE :3006 | Semantic Actions Enabled</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NatashaChatbot;
