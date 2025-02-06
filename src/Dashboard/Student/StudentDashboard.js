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
        <button className="dashboard-btn notifications-btn" onClick={() => navigate("/notifications")}>
          Notifications
        </button>
        <button className="dashboard-btn feedback-btn" onClick={() => navigate("/student-feedback")}>
  Give Feedback
</button>

      </div>

      {/* Feedback Form (Toggles On/Off) */}
      {showFeedback && <StudentFeedback />}

      {/* Logout Button */}
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default StudentDashboard;
