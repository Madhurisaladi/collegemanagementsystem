import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [userName, setUserName] = useState("John Doe"); // Placeholder name, can be updated dynamically

  // Navigation handlers
  const handleRegister = () => {
    navigate("/register"); // Navigate to the Register page
    setShowToast(true); // Show the toast popup when user is registered
  };

  const handleProfile = () => {
    navigate("/edit-profile"); // Navigate to the Profile Edit page
  };

  const handleNotifications = () => {
    navigate("/notifications"); // Navigate to Notifications page
  };

  const handleFeedback = () => {
    navigate("/feedback"); // Navigate to Feedback page
  };

  return (
    <div className="dashboard-container">
      {/* Logo */}
      <div className="logo-container">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/5/54/Bullayya_College_logo.png"
          alt="DLBC Logo"
          className="logo"
        />
      </div>

      {/* Title */}
      <div className="dashboard-header">
        <h1>DLBC EduBridge</h1>
        <p>Admin Dashboard - Manage Users, Notifications, and Feedback</p>
      </div>

      {/* Popup Toast */}
      {showToast && (
        <div className="toast-message">
          <p>Hi {userName}, you are now registered!</p>
        </div>
      )}

      <div className="dashboard-buttons">
        {/* Register New User Button */}
        <button className="dashboard-btn register-btn" onClick={handleRegister}>
          <i className="fas fa-user-plus"></i> Register New User
        </button>

        {/* Profile Management Button */}
        <button className="dashboard-btn profile-btn" onClick={handleProfile}>
          <i className="fas fa-user-circle"></i> Profile
        </button>

        {/* Edit Notifications Button */}
        <button className="dashboard-btn notifications-btn" onClick={handleNotifications}>
          <i className="fas fa-bell"></i> Edit Notifications
        </button>

        {/* Feedback Management Button */}
        <button className="dashboard-btn feedback-btn" onClick={handleFeedback}>
          <i className="fas fa-comment-dots"></i> Feedback
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;

