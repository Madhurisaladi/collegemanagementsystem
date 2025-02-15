import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Adjust the path based on your project structure
import { getAuth } from "firebase/auth"; // Import Firebase Authentication
import "./StudentProfile.css";

const StudentProfile = () => {
  const navigate = useNavigate();
  const auth = getAuth(); // Initialize Firebase Authentication
  const user = auth.currentUser; // Get the current authenticated user
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [department, setDepartment] = useState("");
  const [section, setSection] = useState(""); // New field for Section
  const [year, setYear] = useState(""); // New field for Year
  const [semester, setSemester] = useState(""); // New field for Semester
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid); // Reference to user's Firestore document
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setName(userData.name);
            setEmail(userData.email);
            setStudentId(userData.studentId);
            setDepartment(userData.department);
            setSection(userData.section || ""); // Fetch section
            setYear(userData.year || ""); // Fetch year
            setSemester(userData.semester || ""); // Fetch semester
          } else {
            setError("User profile not found in Firestore.");
          }
        } catch (error) {
          setError("Error fetching profile data.");
        }
      } else {
        setError("No user is logged in.");
      }
    };

    fetchProfile();
  }, [user]); // Re-fetch if user changes

  const handleSave = async () => {
    try {
      const userDocRef = doc(db, "users", user.uid); // Reference to the user's document in Firestore
      await updateDoc(userDocRef, {
        name,
        email,
        studentId,
        department,
        section,
        year,
        semester,
      }); // Update all editable fields in Firestore
      alert("Profile updated successfully!");
      navigate("/student-dashboard"); // Navigate back to Student Dashboard after save
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="student-profile-container">
      {/* Logo */}
      <div className="logo-container">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/5/54/Bullayya_College_logo.png"
          alt="College Logo"
          className="logo"
        />
      </div>

      {/* Edit Profile Header */}
      <h1>Student Profile</h1>
      <form onSubmit={(e) => e.preventDefault()} className="profile-form">
        {error && <p className="error-message">{error}</p>} {/* Show error message if any */}

        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            className="form-input"
            disabled // Email is typically non-editable
          />
        </div>

        <div className="form-group">
          <label>Student ID:</label>
          <input
            type="text"
            name="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Department:</label>
          <input
            type="text"
            name="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Section:</label>
          <input
            type="text"
            name="section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Year:</label>
          <input
            type="text"
            name="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Semester:</label>
          <input
            type="text"
            name="semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="form-input"
          />
        </div>

        <button type="button" onClick={handleSave} className="save-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default StudentProfile;
