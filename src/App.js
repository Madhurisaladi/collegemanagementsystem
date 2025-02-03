import React from "react";
import "animate.css"; // For animations
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importing components
import Login from "./components/Login"; // Adjust path to your Login component
import Home from "./components/Home"; // Create a Home component for after login
import Register from "./components/register"; // Corrected Register import to lowercase "register"
import StudentDashboard from "./Dashboard/Student/StudentDashboard";
import FacultyDashboard from "./Dashboard/Faculty/FacultyDashboard";
import AdminDashboard from "./Dashboard/Admin/Admindashboard.js";
import EditProfile from "./Dashboard/Admin/EditProfile"; // Import the Profile Edit Component
import NotificationPage from "./Dashboard/Admin/notification.js";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Role-Based Dashboard Routes */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/notification" element={<NotificationPage />} />
        {/* Admin Profile Edit Route */}
        <Route path="/edit-profile" element={<EditProfile />} /> {/* New Route for Profile Editing */}
      </Routes>
    </Router>
  );
}

export default App;
