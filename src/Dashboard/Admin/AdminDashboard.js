import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Navigation handlers
  const handleRegister = () => {
    navigate("/register");
  };

  const handleProfile = () => {
    navigate("/edit-profile");
  };

  const handleNotifications = () => {
    navigate("/AdminNotification");
  };

  const handleFeedback = () => {
    navigate("/admin-feedback"); // Navigate to Admin Feedback Page
  };

  const handleLogout = () => {
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

      {/* Logout Button */}
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
          <i className="fas fa-bell"></i> Push Notifications
        </button>
        <button className="dashboard-btn feedback-btn" onClick={handleFeedback}>
          <i className="fas fa-comment-dots"></i> View Feedback
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
