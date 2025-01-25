import React from "react";
import { useNavigate } from "react-router-dom";
import './AdminDashboard.css'; // Make sure to import the CSS file

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register"); // Redirect to the registration page
  };

  return (
    <div className="dashboard-container">
      <button className="register-btn" onClick={handleRegister}>
        Register New User
      </button>
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin! Here you can manage users and roles.</p>
    </div>
  );
};

export default AdminDashboard;
