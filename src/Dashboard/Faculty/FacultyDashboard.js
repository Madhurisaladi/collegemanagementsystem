import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FacultyDashboard.css";

const FacultyDashboard = () => {
  const navigate = useNavigate();

  const [showAttendance, setShowAttendance] = useState(false);
  const [showGradeManagement, setShowGradeManagement] = useState(false);
  const [showCommunication, setShowCommunication] = useState(false);
  const [showProfileManagement, setShowProfileManagement] = useState(false);
  const [showSupport, setShowSupport] = useState(false);

  // Toggle dropdown visibility
  const toggleAttendance = () => setShowAttendance(!showAttendance);
  const toggleGradeManagement = () => setShowGradeManagement(!showGradeManagement);
  const toggleCommunication = () => setShowCommunication(!showCommunication);
  const toggleProfileManagement = () => setShowProfileManagement(!showProfileManagement);
  const toggleSupport = () => setShowSupport(!showSupport);

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
            <button className="dropdown-btn" onClick={() => alert("Update Attendance")}>Update Attendance</button>
            <button className="dropdown-btn" onClick={() => alert("View Records")}>View Records</button>
          </div>
        )}

        <button className="dashboard-btn grade-btn" onClick={toggleGradeManagement}>
          Grade Management
        </button>
        {showGradeManagement && (
          <div className="dropdown-content">
            <button className="dropdown-btn" onClick={() => alert("Upload Grades")}>Upload Grades</button>
            <button className="dropdown-btn" onClick={() => alert("View Gradebook")}>View Gradebook</button>
          </div>
        )}

        <button className="dashboard-btn communication-btn" onClick={toggleCommunication}>
          Communication
        </button>
        {showCommunication && (
          <div className="dropdown-content">
            <button className="dropdown-btn" onClick={() => alert("Send Notification")}>Send Notification</button>
            <button className="dropdown-btn" onClick={() => alert("View Feedback")}>View Feedback</button>
          </div>
        )}

        <button className="dashboard-btn profile-btn" onClick={toggleProfileManagement}>
          Profile Management
        </button>
        {showProfileManagement && (
          <div className="dropdown-content">
            <button className="dropdown-btn" onClick={() => alert("Edit Profile")}>Edit Profile</button>
            <button className="dropdown-btn" onClick={() => alert("Change Password")}>Change Password</button>
          </div>
        )}

        <button className="dashboard-btn support-btn" onClick={toggleSupport}>
          Support
        </button>
        {showSupport && (
          <div className="dropdown-content">
            <button className="dropdown-btn" onClick={() => alert("Help Center")}>Help Center</button>
            <button className="dropdown-btn" onClick={() => alert("Raise a Query")}>Raise a Query</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyDashboard;
