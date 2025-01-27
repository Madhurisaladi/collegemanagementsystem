import React from "react";
import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session or authentication here
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* Logo */}
      <div className="logo-container">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/5/54/Bullayya_College_logo.png"
          alt="College Logo"
          className="logo"
        />
      </div>

      {/* Header */}
      <div className="dashboard-header">
        <h1>Student Dashboard</h1>
        <p>Welcome to your dashboard. Navigate through your options below.</p>
      </div>

      {/* Buttons Section */}
      <div className="dashboard-buttons">
        <button className="dashboard-btn attendence-btn" onClick={() => navigate("/view-attendence")}>View Attendance</button>
        <button className="dashboard-btn profile-btn" onClick={() => navigate("/profile")}>Profile</button>
        <button className="dashboard-btn notifications-btn" onClick={() => navigate("/notifications")}>Notifications</button>
        <button className="dashboard-btn feedback-btn" onClick={() => navigate("/feedback")}>Feedback</button>
      </div>

      {/* Logout Button */}
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default StudentDashboard;

