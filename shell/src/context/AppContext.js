import React, { createContext, useContext, useState, useEffect } from "react";

// Create context
export const AppContext = createContext();

// Simple user data for learning
const initialUserData = {
  id: "yogendr_123",
  name: "Yogendra Saxena",
  email: "yogendrasaxena56@gmail.com",
  role: "Software Engineer",
  avatar: "👨",
};

// Context Provider Component
export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(initialUserData);

  // Make context available globally for MFEs
  useEffect(() => {
    window.mfeGlobalContext = { user }; // just setting in global for my understanding and debugging...

    // Listen for user update REQUESTS from MFEs
    window.mfeEventBus.on("user:update", (updates) => {
      setUser((prev) => ({ ...prev, ...updates }));
    });
  }, [user]);

  // Broadcast user updates to all MFEs
  useEffect(() => {
    window.mfeEventBus.emit("user:updated", user);
  }, [user]);

  return <AppContext.Provider value={{ user }}>{children}</AppContext.Provider>;
};

export default AppContext;
