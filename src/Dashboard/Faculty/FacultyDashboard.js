import React from "react";
import { useNavigate } from "react-router-dom";

const FacultyDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Faculty Dashboard</h1>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/login")} // Navigate back to login
        >
          Logout
        </button>
      </header>

      {/* Overview Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium">Classes Assigned</h3>
            <p className="text-2xl font-bold">5</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium">Students in Total</h3>
            <p className="text-2xl font-bold">120</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium">Pending Tasks</h3>
            <p className="text-2xl font-bold">8</p>
          </div>
        </div>
      </section>

      {/* Attendance Management Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Attendance Management</h2>
        <div className="flex gap-4">
          <button className="btn btn-primary" onClick={() => alert("Mark Attendance")}>
            Mark Attendance
          </button>
          <button className="btn btn-primary" onClick={() => alert("Update Attendance")}>
            Update Attendance
          </button>
          <button className="btn btn-primary" onClick={() => alert("View Attendance Records")}>
            View Records
          </button>
        </div>
      </section>

      {/* Grade Management Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Grade Management</h2>
        <div className="flex gap-4">
          <button className="btn btn-primary" onClick={() => alert("Upload Grades")}>
            Upload Grades
          </button>
          <button className="btn btn-primary" onClick={() => alert("View Gradebook")}>
            View Gradebook
          </button>
        </div>
      </section>

      {/* Communication Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Communication</h2>
        <div className="flex gap-4">
          <button className="btn btn-primary" onClick={() => alert("Send Notification")}>
            Send Notification
          </button>
          <button className="btn btn-primary" onClick={() => alert("View Feedback")}>
            View Feedback
          </button>
        </div>
      </section>

      {/* Profile Management Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Profile Management</h2>
        <div className="flex gap-4">
          <button className="btn btn-primary" onClick={() => alert("Edit Profile")}>
            Edit Profile
          </button>
          <button className="btn btn-primary" onClick={() => alert("Change Password")}>
            Change Password
          </button>
        </div>
      </section>

      {/* Help Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Support</h2>
        <div className="flex gap-4">
          <button className="btn btn-primary" onClick={() => alert("Help Center")}>
            Help Center
          </button>
          <button className="btn btn-primary" onClick={() => alert("Raise a Query")}>
            Raise a Query
          </button>
        </div>
      </section>
    </div>
  );
};

export default FacultyDashboard;
