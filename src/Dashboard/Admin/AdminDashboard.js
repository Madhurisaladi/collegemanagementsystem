import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [userName, setUserName] = useState("John Doe");

  // Navigation handlers
  const handleRegister = () => {
    navigate("/register");
    setShowToast(true);
  };

  const handleProfile = () => {
    navigate("/edit-profile");
  };

  const handleNotifications = () => {
    navigate("/notification"); 
  };

  const handleFeedback = () => {
    navigate("/feedback");
  };

  const handleLogout = () => {
    // Redirect to home page (typically "/")
    navigate("/");
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
        <p>Admin Dashboard</p>
      </div>

      {/* Popup Toast */}
      {showToast && (
        <div className="toast-message">
          <p>Hi {userName}, you are now registered!</p>
        </div>
      )}

      {/* Logout Button at top-right */}
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

      {/* Dashboard Buttons */}
      <div className="dashboard-buttons">
        <button className="dashboard-btn register-btn" onClick={handleRegister}>
          <i className="fas fa-user-plus"></i> Register New User
        </button>
        <button className="dashboard-btn profile-btn" onClick={handleProfile}>
          <i className="fas fa-user-circle"></i> Profile
        </button>
        <button className="dashboard-btn notification-btn" onClick={handleNotifications}>
          <i className="fas fa-bell"></i> Edit Notifications
        </button>
        <button className="dashboard-btn feedback-btn" onClick={handleFeedback}>
          <i className="fas fa-comment-dots"></i> Feedback
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
