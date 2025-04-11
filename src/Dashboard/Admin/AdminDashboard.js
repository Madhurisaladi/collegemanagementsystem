import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <ul>
          <li><Link to="/admin-dashboard">Home</Link></li>
          <li><Link to="/register">New Registration</Link></li>
          <li><Link to="/admin-notifications">Send Notifications</Link></li>
          <li><Link to="/admin-feedback">Feedback</Link></li>
          <li><Link to="/edit-profile">Profile</Link></li>
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

        <h1>Welcome to Student Mate</h1>
        <p className="black-text">Empowering administrators with tools to manage users, notifications, and feedback efficiently.</p>

        {/* Learn More Button */}
        <div className="learn-more">
          <a href="https://bullayyacollege.org/" target="_blank" rel="noopener noreferrer" className="btn btn-learn">Learn More</a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
