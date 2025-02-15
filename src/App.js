import React from "react";
import "animate.css"; // For animations
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importing components
import Login from "./components/Login"; 
import Home from "./components/Home"; 
import Register from "./components/register"; 
import StudentDashboard from "./Dashboard/Student/StudentDashboard";
import FacultyDashboard from "./Dashboard/Faculty/FacultyDashboard";
import AdminDashboard from "./Dashboard/Admin/AdminDashboard.js";  
import FacultyProfile from "./Dashboard/Faculty/FacultyProfile";
import StudentProfile from "./Dashboard/Student/StudentProfile"; 
import EditProfile from "./Dashboard/Admin/EditProfile"; 
import StudentFeedback from "./Dashboard/Student/StudentFeedback"; 
import FacultyFeedback from "./Dashboard/Faculty/FacultyFeedback"; 
import AdminFeedback from "./Dashboard/Admin/AdminFeedback";  
import StudentNotification from "./Dashboard/Student/StudentNotification";
import AdminNotification from "./Dashboard/Admin/AdminNotification";

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
        
        {/* Profile Routes */}
        <Route path="/faculty-profile" element={<FacultyProfile />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        
        {/* Admin Profile Edit Route */}
        <Route path="/edit-profile" element={<EditProfile />} /> 
        <Route path="/AdminNotification" element={<AdminNotification />} />
        <Route path="/StudentNotification" element={<StudentNotification />} /> 

        {/* Feedback Pages */}
        <Route path="/student-feedback" element={<StudentFeedback />} />
        <Route path="/faculty-feedback" element={<FacultyFeedback />} />
        <Route path="/admin-feedback" element={<AdminFeedback />} /> 
      </Routes>
    </Router>
  );
}

export default App;
