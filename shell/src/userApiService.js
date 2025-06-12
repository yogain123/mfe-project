const API_BASE_URL = "http://localhost:3005";

/**
 * User API Service for Shell Application
 * Independent API service for shell's user operations
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
      console.log("✅ Shell: User data fetched successfully:", userData);
      return userData;
    } catch (error) {
      console.error("❌ Shell: Error fetching user data:", error);
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
      console.log("✅ Shell: User data updated successfully:", updatedUserData);
      return updatedUserData;
    } catch (error) {
      console.error("❌ Shell: Error updating user data:", error);
      throw error;
    }
  }
}

export default UserApiService;
