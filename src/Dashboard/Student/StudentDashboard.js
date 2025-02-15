import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentFeedback from "./StudentFeedback"; // Import Feedback Component
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [showFeedback, setShowFeedback] = useState(false); // State to show/hide feedback

  const handleLogout = () => {
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* Profile Section with Dropdown */}
      <div className="profile-section">
        <div className="profile-wrapper">
          <div className="profile-avatar" onClick={() => navigate("/student-profile")}>
            <img 
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2343a047'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E"
              alt="Profile"
              className="avatar"
            />
          </div>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

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
        <button className="dashboard-btn attendence-btn" onClick={() => navigate("/view-attendance")}>
          View Attendance
        </button>
        <button className="dashboard-btn profile-btn" onClick={() => navigate("/student-profile")}>
          Profile
        </button>
        <button className="dashboard-btn notifications-btn" onClick={() => navigate("/StudentNotification")}>
          Notifications
        </button>
        <button className="dashboard-btn feedback-btn" onClick={() => navigate("/student-feedback")}>
          Give Feedback
        </button>
      </div>

      {/* Feedback Form (Toggles On/Off) */}
      {showFeedback && <StudentFeedback />}
    </div>
  );
};

export default StudentDashboard;
