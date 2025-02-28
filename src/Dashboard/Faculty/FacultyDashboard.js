import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './FacultyDashboard.css';

const FacultyDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <ul>
          <li><Link to="/faculty-dashboard">Home</Link></li>
          
          <li><Link to="/faculty-notifications">Send Notifications</Link></li>
          <li><Link to="/faculty-feedback">Feedback</Link></li>
          <li><Link to="/faculty-profile">Profile</Link></li>
          <li><Link to="/faculty-documents">Documents</Link></li>
          <li><Link to="/" className="nav-logout">Logout</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="content">
        <div className="logo">
          <img 
            src="https://upload.wikimedia.org/wikipedia/en/5/54/Bullayya_College_logo.png" 
            alt="DLBC Logo" 
          />
        </div>

        <h1>Welcome to Faculty Dashboard</h1>
        <p className="black-text">Manage your classes, attendance, feedback, and documents efficiently.</p>
      </div>
    </div>
  );
};

export default FacultyDashboard;
