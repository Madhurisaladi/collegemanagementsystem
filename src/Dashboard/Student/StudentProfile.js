import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Adjust the path based on your project structure
import { useAuth } from "../../auth/AuthContext"; // Import the useAuth hook
import "./StudentProfile.css";

const StudentProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user from AuthContext

  const [studentData, setStudentData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, "students", user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setStudentData(userDoc.data());
          } else {
            setError("Student profile not found.");
          }
        } catch (error) {
          setError("Error fetching profile data.");
          console.error("Error:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setError("No user is logged in.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!user) {
      setError("User not authenticated.");
      return;
    }

    try {
      const userDocRef = doc(db, "students", user.uid);

      // Only update editable fields (avoid overwriting timestamp)
      const { name, department, studentId, year, section, semester } = studentData;
      await updateDoc(userDocRef, { name, department, studentId, year, section, semester });

      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

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

      <div className="profile-header">
        <h1>Student Profile</h1>
        <button
          className={`edit-button ${isEditing ? "save" : "edit"}`}
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>

      <div className="profile-content">
        {["name", "email", "role", "studentId", "department", "year", "section", "semester"].map((field) => (
          <div key={field} className="form-group">
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            {isEditing && field !== "email" && field !== "role" ? (
              <input
                type="text"
                name={field}
                value={studentData[field]}
                onChange={handleInputChange}
                className="form-input"
              />
            ) : (
              <p className="info-text">{studentData[field]}</p>
            )}
          </div>
        ))}

        {/* Registration Date (Read-only) */}
        <div className="form-group">
          <label>Registration Date:</label>
          <p className="info-text">
            {studentData.timestamp ? studentData.timestamp.toDate().toLocaleString() : "N/A"}
          </p>
        </div>
      </div>

      <button className="back-button" onClick={() => navigate("/student-dashboard")}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default StudentProfile;
