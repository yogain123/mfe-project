import React, { createContext, useContext, useState, useEffect } from "react";
import UserApiService from "./userApiService";

// Create context
export const AppContext = createContext();

// Fallback user data for when API is not available
const fallbackUserData = {
  id: "yogendr_123",
  name: "Yogendra Saxena",
  email: "yogendrasaxena56@gmail.com",
  role: "Software Engineer",
  avatar: "👨",
};

// Context Provider Component
export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(fallbackUserData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch initial user data from API on component mount
  useEffect(() => {
    const fetchInitialUserData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Shell uses its own API service for initial data loading
        const userData = await UserApiService.getUser();
        setUser(userData);
        console.log("🎯 Shell: Initial user data loaded from API:", userData);
      } catch (err) {
        console.warn(
          "⚠️ Shell: Failed to fetch initial user data from API, using fallback:",
          err.message
        );
        setError(err.message);
        setUser(fallbackUserData);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialUserData();
  }, []);

  // Make context and API service available globally for MFEs
  useEffect(() => {
    // Provide global context for MFEs
    window.mfeGlobalContext = {
      user,
      loading,
      error,
      apiStatus: error ? "error" : "connected",
    };

    // Listen for user data updates from MFEs (after they've made API calls)
    const handleUserUpdated = (updatedUserData) => {
      console.log(
        "📡 Shell: Received user data update from MFE:",
        updatedUserData
      );
      setUser(updatedUserData);
      setError(null); // Clear any previous errors since update was successful
    };

    // Listen for API errors from MFEs
    const handleApiError = (errorInfo) => {
      console.error("📡 Shell: Received API error from MFE:", errorInfo);
      setError(errorInfo.message || "API Error");
    };

    window.mfeEventBus.on("user:data-updated", handleUserUpdated);
    window.mfeEventBus.on("user:api-error", handleApiError);

    // Cleanup listeners
    return () => {
      window.mfeEventBus.off("user:data-updated", handleUserUpdated);
      window.mfeEventBus.off("user:api-error", handleApiError);
    };
  }, [user, loading, error]);

  // Broadcast user updates to all MFEs when data changes
  useEffect(() => {
    if (!loading) {
      window.mfeEventBus.emit("user:updated", user);
      console.log("📢 Shell: Broadcasting user data to all MFEs:", user);
    }
  }, [user, loading]);

  return (
    <AppContext.Provider
      value={{
        user,
        loading,
        error,
        apiStatus: error ? "error" : "connected",
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
