import React from "react";
import "animate.css"; // For animations
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importing components
import Login from "./components/Login"; // Adjust path to your Login component
import Home from "./components/Home"; // Create a Home component for after login
import Register from "./components/register"; // Corrected Register import to lowercase "register"
import StudentDashboard from "./Dashboard/Student/StudentDashboard";
import FacultyDashboard from "./Dashboard/Faculty/FacultyDashboard";
import AdminDashboard from "./Dashboard/Admin/AdminDashboard"; 
import FacultyProfile from "./Dashboard/Faculty/FacultyProfile"; // Updated to FacultyProfile
import EditProfile from "./Dashboard/Admin/EditProfile"; // Import the Profile Edit Component for Admin

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
        
        {/* Admin Profile Edit Route */}
        <Route path="/edit-profile" element={<EditProfile />} /> {/* New Route for Profile Editing */}
        
        {/* Faculty Profile Route */}
        <Route path="/faculty-profile" element={<FacultyProfile />} /> {/* Faculty Profile Route */}
      </Routes>
    </Router>
  );
}

export default App;
