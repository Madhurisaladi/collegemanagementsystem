import React from "react";
import { Link } from "react-router-dom";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/student-dashboard">Home</Link>
          </li>
          <li>
            <Link to="/student-notifications">Notifications</Link>
          </li>
          <li>
            <Link to="/student-feedback">Give Feedback</Link>
          </li>
          <li>
            <Link to="/student-profile">Profile</Link>
          </li>
          <li>
            <a href="https://lbce.edu.in/engcollege/login" target="_blank" rel="noopener noreferrer">
              Digital Library
            </a>
          </li>
          <li>
            <Link to="/student-documents">Documents</Link>
          </li>
          <li>
            <Link to="/" className="nav-logout">
              Logout
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="content">
        <div className="logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/5/54/Bullayya_College_logo.png"
            alt="College Logo"
          />
        </div>

        <h1>Welcome to Student Dashboard</h1>
        <p className="black-text">
          Access your attendance, notifications, feedback, and documents with ease.
        </p>
      </div>
    </div>
  );
};

export default StudentDashboard;
