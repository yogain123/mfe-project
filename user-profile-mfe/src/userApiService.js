const API_BASE_URL = "http://localhost:3005";

/**
 * User API Service for User Profile MFE
 * Independent API service for this MFE's user operations
 */
class UserApiService {
  /**
   * Fetch user data from the API
   * @returns {Promise<Object>} User data object
   */
  static async getUser() {
    try {
      const response = await fetch(`${API_BASE_URL}/user`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const userData = await response.json();
      console.log(
        "✅ User Profile MFE: User data fetched successfully:",
        userData
      );
      return userData;
    } catch (error) {
      console.error("❌ User Profile MFE: Error fetching user data:", error);
      throw error;
    }
  }

  /**
   * Update user data via API
   * @param {Object} userData - Updated user data
   * @returns {Promise<Object>} Updated user data object
   */
  static async updateUser(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedUserData = await response.json();
      console.log(
        "✅ User Profile MFE: User data updated successfully:",
        updatedUserData
      );
      return updatedUserData;
    } catch (error) {
      console.error("❌ User Profile MFE: Error updating user data:", error);
      throw error;
    }
  }

  /**
   * Helper method to update user and notify other MFEs
   * @param {Object} updates - User data updates
   */
  static async updateUserAndNotify(updates) {
    try {
      // Get current user data
      const currentUser = window.mfeGlobalContext?.user || {};

      // Merge updates with current data
      const updatedUserData = { ...currentUser, ...updates };

      // Make API call
      const apiResponse = await this.updateUser(updatedUserData);

      // Notify all MFEs about the successful update
      if (window.mfeEventBus) {
        window.mfeEventBus.emit("user:updated", apiResponse);
        console.log("📡 User Profile MFE: Notified all MFEs about user update");
      }

      return apiResponse;
    } catch (error) {
      // Notify about API error
      if (window.mfeEventBus) {
        window.mfeEventBus.emit("user:api-error", {
          message: error.message,
          source: "User Profile MFE",
          updates: updates,
        });
        console.error(
          "📡 User Profile MFE: Notified about API error:",
          error.message
        );
      }
      throw error;
    }
  }
}

export default UserApiService;
