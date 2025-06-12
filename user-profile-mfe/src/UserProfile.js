import React, { useState, useEffect } from "react";
import "./styles.css";
import UserApiService from "./userApiService";

const UserProfile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "",
  });

  // Update form data when user prop changes
  useEffect(() => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role || "",
    });
  }, [user]);

  const handleSave = async () => {
    const hasChanges =
      formData.name !== user?.name ||
      formData.email !== user?.email ||
      formData.role !== user?.role;

    if (hasChanges) {
      try {
        // User Profile MFE makes its own API call
        await UserApiService.updateUserAndNotify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          role: formData.role.trim(),
        });
        console.log("🔄 User Profile MFE: User update completed successfully");
      } catch (error) {
        console.error(
          "❌ User Profile MFE: Failed to update user:",
          error.message
        );
        // Could show user-friendly error message here
      }
    }

    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role || "",
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="user-profile-container">
        <div className="user-profile error">
          <div className="error-content">
            <span className="error-icon">⚠️</span>
            <div>
              <strong>No User Data</strong>
              <p>Unable to load user profile information</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-profile-container">
      <div className="user-profile">
        <div className="profile-header">
          <div className="avatar">{user.avatar}</div>
          <div className="user-info">
            <h3>{user.name}</h3>
            <p>{user.role}</p>
          </div>
          <button
            className={`edit-btn ${isEditing ? "cancel" : "edit"}`}
            onClick={() => (isEditing ? handleCancel() : setIsEditing(true))}
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        {isEditing ? (
          <div className="edit-form">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Role:</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              />
            </div>
            <button className="save-btn" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        ) : (
          <div className="profile-details">
            <div className="detail-item">
              <strong>Email:</strong> {user.email}
            </div>
            <div className="detail-item">
              <strong>Role:</strong> {user.role}
            </div>
          </div>
        )}

        <div className="mfe-info">
          <small>👤 User Profile MFE :3004</small>
        </div>

        {/* MFE Footer */}
        <div
          style={{
            backgroundColor: "#fd7e14",
            color: "white",
            padding: "10px",
            marginTop: "15px",
            textAlign: "center",
            borderRadius: "6px",
            fontSize: "11px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <span>
              <strong>👤 User Profile MFE</strong>
            </span>
            <span style={{ opacity: "0.9" }}>
              Port: 3004 | Type: Component MFE
            </span>
            <span style={{ opacity: "0.8" }}>Module Federation</span>
          </div>
          <div style={{ marginTop: "6px", fontSize: "9px", opacity: "0.5" }}>
            🌐 window.mfeEventBus | User: {user?.name || "null"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
