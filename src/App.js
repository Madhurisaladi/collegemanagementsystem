import React from "react";
import "animate.css";//for animations
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login"; // Adjust path to your Login component
import Home from "./components/Home"; // Create a Home component for after login
import Register from "./components/register"; //register page
import StudentDashboard from "./Dashboard/Student/StudentDashboard.js";
import FacultyDashboard from "./Dashboard/Faculty/FacultyDashboard.js";
import AdminDashboard from "./Dashboard/Admin/AdminDashboard.js"; 
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
      </Routes>
    </Router>
  );
}

export default App;

