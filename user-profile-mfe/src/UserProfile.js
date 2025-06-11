import React, { useState } from 'react';
import './styles.css';

const UserProfile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || ''
  });

  const handleSave = () => {
    console.log('Saving user profile:', formData);
    setIsEditing(false);
    // In a real app, this would make an API call
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      role: user?.role || ''
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="user-profile error">
        <p>❌ No user data provided</p>
      </div>
    );
  }

  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="avatar">
          {user.avatar || '👤'}
        </div>
        <div className="mfe-info">
          <span className="mfe-badge">User Profile MFE :3004</span>
        </div>
      </div>

      <div className="profile-content">
        {!isEditing ? (
          <div className="profile-view">
            <div className="field">
              <label>Name:</label>
              <span>{user.name}</span>
            </div>
            <div className="field">
              <label>Email:</label>
              <span>{user.email}</span>
            </div>
            <div className="field">
              <label>Role:</label>
              <span>{user.role}</span>
            </div>
            <div className="field">
              <label>User ID:</label>
              <span>#{user.id}</span>
            </div>
            
            <button 
              className="btn-edit"
              onClick={() => setIsEditing(true)}
            >
              ✏️ Edit Profile
            </button>
          </div>
        ) : (
          <div className="profile-edit">
            <div className="field">
              <label>Name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="field">
              <label>Email:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="field">
              <label>Role:</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              />
            </div>
            
            <div className="edit-actions">
              <button className="btn-save" onClick={handleSave}>
                ✅ Save
              </button>
              <button className="btn-cancel" onClick={handleCancel}>
                ❌ Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="profile-footer">
        <div className="learning-note">
          💡 <strong>Component MFE:</strong> This profile component is loaded from port 3004 
          and can be embedded in any other MFE that needs user profile functionality.
        </div>
        
        <div className="features">
          <h4>🔧 Features:</h4>
          <ul>
            <li>✅ Reusable across multiple MFEs</li>
            <li>✅ Independent state management</li>
            <li>✅ Props-based data input</li>
            <li>✅ Edit/view modes</li>
            <li>✅ Isolated styling</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 