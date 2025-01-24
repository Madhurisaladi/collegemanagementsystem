import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register"); // Redirect to the registration page
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin! Here you can manage users and roles.</p>
      <button onClick={handleRegister}>Register New User</button>
    </div>
  );
};

export default AdminDashboard;
