import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './auth/AuthContext';

// Correct the import paths
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "../src/components/register";
import StudentDashboard from "./Dashboard/Student/StudentDashboard";
import FacultyDashboard from "./Dashboard/Faculty/FacultyDashboard";
import AdminDashboard from "../src/Dashboard/Admin/AdminDashboard";
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
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/faculty-profile" element={<FacultyProfile />} />
          <Route path="/student-profile" element={<StudentProfile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/AdminNotification" element={<AdminNotification />} />
          <Route path="/StudentNotification" element={<StudentNotification />} />
          <Route path="/student-feedback" element={<StudentFeedback />} />
          <Route path="/faculty-feedback" element={<FacultyFeedback />} />
          <Route path="/admin-feedback" element={<AdminFeedback />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
