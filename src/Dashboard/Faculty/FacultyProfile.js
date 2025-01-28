import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Adjust the path based on your project structure
import { getAuth } from "firebase/auth"; // Import Firebase Authentication
import "./FacultyProfile.css";

const FacultyProfile = () => {
  const navigate = useNavigate();
  const auth = getAuth(); // Initialize Firebase Authentication
  const user = auth.currentUser; // Get the current authenticated user
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid); // Reference to user's Firestore document
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setName(userData.name); // Set name
            setEmail(userData.email); // Set email
            setDepartment(userData.department); // Set department
            setFacultyId(userData.facultyId); // Set faculty ID
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
        department,
        facultyId,
      }); // Update all editable fields in Firestore
      alert("Profile updated successfully!");
      navigate("/faculty-dashboard"); // Navigate back to Faculty Dashboard after save
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="faculty-profile-container">
      {/* Logo */}
      <div className="logo-container">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/5/54/Bullayya_College_logo.png"
          alt="College Logo"
          className="logo"
        />
      </div>

      {/* Edit Profile Header */}
      <h1>Faculty Profile</h1>
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
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            disabled // Email is typically non-editable, but you can allow it if needed
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
          <label>Faculty ID:</label>
          <input
            type="text"
            name="facultyId"
            value={facultyId}
            onChange={(e) => setFacultyId(e.target.value)}
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

export default FacultyProfile;
