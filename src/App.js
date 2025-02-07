import React from "react";
import "animate.css"; // For animations
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importing components
import Login from "./components/Login"; // Adjust path to your Login component
import Home from "./components/Home"; // Create a Home component for after login
import Register from "./components/register"; // Corrected Register import to lowercase "register"
import StudentDashboard from "./Dashboard/Student/StudentDashboard";
import FacultyDashboard from "./Dashboard/Faculty/FacultyDashboard";
import AdminDashboard from "./Dashboard/Admin/AdminDashboard.js";  // Correct
 
import FacultyProfile from "./Dashboard/Faculty/FacultyProfile"; // Updated to FacultyProfile
import StudentProfile from "./Dashboard/Student/StudentProfile"; // Added StudentProfile
import EditProfile from "./Dashboard/Admin/EditProfile"; // Import the Profile Edit Component for Admin
import Notification from './Dashboard/Admin/notification'; // Make sure the path is correct
import StudentNotification from "./Dashboard/Student/StudentNotification.js"; // Correct import, no duplication

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
        <Route path="/faculty-profile" element={<FacultyProfile />} /> {/* Faculty Profile Route */}
        <Route path="/student-profile" element={<StudentProfile />} /> {/* Student Profile Route */}
        
        {/* Admin Profile Edit Route */}
        <Route path="/edit-profile" element={<EditProfile />} /> {/* New Route for Profile Editing */}
        <Route path="/notification" element={<Notification />} />
        <Route path="/StudentNotifications" element={<StudentNotification />} /> {/* Correct path for Student Notifications */}
      </Routes>
    </Router>
  );
}

export default App;
