import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FacultyFeedback from "./FacultyFeedback"; // Import the Feedback Component
import "./FacultyDashboard.css";

const FacultyDashboard = () => {
  const navigate = useNavigate();

  const [showAttendance, setShowAttendance] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Toggle dropdown visibility
  const toggleAttendance = () => setShowAttendance(!showAttendance);
  const toggleNotifications = () => setShowNotifications(!showNotifications);
  const toggleFeedback = () => setShowFeedback(!showFeedback);
  const toggleProfile = () => setShowProfile(!showProfile);

  return (
    <div className="dashboard-container">
      {/* Logo and Title */}
      <div className="logo-container">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/5/54/Bullayya_College_logo.png"
          alt="DLBC Logo"
          className="logo"
        />
        <h1 className="dashboard-title">Faculty Dashboard</h1>
      </div>

      {/* Logout Button */}
      <button className="logout-btn" onClick={() => navigate("/login")}>Logout</button>

      {/* Overview Cards */}
      <div className="overview-cards">
        <div className="card">
          <h3>Classes Assigned</h3>
          <p>5</p>
        </div>
        <div className="card">
          <h3>Students in Total</h3>
          <p>120</p>
        </div>
        <div className="card">
          <h3>Pending Tasks</h3>
          <p>8</p>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="section-buttons">
        <button className="dashboard-btn attendance-btn" onClick={toggleAttendance}>
          Attendance Management
        </button>
        {showAttendance && (
          <div className="dropdown-content">
            <button className="dropdown-btn" onClick={() => alert("Mark Attendance")}>Mark Attendance</button>
          </div>
        )}

        <button className="dashboard-btn notifications-btn" onClick={toggleNotifications}>
          Notifications
        </button>
        {showNotifications && (
          <div className="dropdown-content">
            <button className="dropdown-btn" onClick={() => alert("Send Notifications")}>Send Notifications</button>
          </div>
        )}

        {/* Feedback Section */}
        <button className="dashboard-btn feedback-btn" onClick={() => navigate("/faculty-feedback")}>
          Feedback
        </button>

        {showFeedback && <FacultyFeedback />} {/* Show feedback list */}

        <button className="dashboard-btn profile-btn" onClick={() => navigate("/faculty-profile")}>
          Profile
        </button>

        {/* Documents Section */}
        <button className="dashboard-btn documents-btn" onClick={() => navigate("/faculty-documents")}>
          Documents
        </button>
      </div>
    </div>
  );
};

export default FacultyDashboard;
