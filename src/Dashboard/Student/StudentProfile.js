import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import "./StudentProfile.css";

const StudentProfile = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [department, setDepartment] = useState("");
  const [section, setSection] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setName(userData.name);
            setEmail(userData.email);
            setStudentId(userData.studentId);
            setDepartment(userData.department || "");
            setSection(userData.section || "");
            setYear(userData.year || "");
            setSemester(userData.semester || "");
          } else {
            setError("User profile not found.");
          }
        } catch (error) {
          setError("Error fetching profile.");
        }
      } else {
        setError("No user is logged in.");
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user) {
      setError("User not authenticated.");
      return;
    }

    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        department,
        section,
        year,
        semester,
      });
      alert("Profile updated!");
      navigate("/student-dashboard");
    } catch (error) {
      alert("Failed to update profile.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="student-profile-container">
      <nav className="navbar">
        <ul>
          <li><Link to="/student-dashboard">Home</Link></li>
          <li><Link to="/view-attendance">View Attendance</Link></li>
          <li><Link to="/student-notifications">Notifications</Link></li>
          <li><Link to="/student-feedback">Give Feedback</Link></li>
          <li><Link to="/student-documents">Documents</Link></li>
          <li><Link to="/" className="nav-logout">Logout</Link></li>
        </ul>
      </nav>

      <div className="logo-container">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/5/54/Bullayya_College_logo.png"
          alt="College Logo"
          className="logo"
        />
      </div>

      <h1>Student Profile</h1>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={(e) => e.preventDefault()} className="profile-form">
        <h2>Personal Information</h2>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} className="form-input" disabled />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} className="form-input" disabled />
        </div>
        <div className="form-group">
          <label>Student ID:</label>
          <input type="text" value={studentId} className="form-input" disabled />
        </div>

        <h2>Academic Information</h2>
        <div className="form-group">
          <label>Department:</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="form-input"
          >
            <option value="">Select Department</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="MECH">MECH</option>
            <option value="CIVIL">CIVIL</option>
          </select>
        </div>
        <div className="form-group">
          <label>Section:</label>
          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="form-input"
          >
            <option value="">Select Section</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>
        <div className="form-group">
          <label>Year:</label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="form-input"
          >
            <option value="">Select Year</option>
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
            <option value="3rd">3rd</option>
            <option value="4th">4th</option>
          </select>
        </div>
        <div className="form-group">
          <label>Semester:</label>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="form-input"
          >
            <option value="">Select Semester</option>
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
          </select>
        </div>
        <button type="button" onClick={handleSave} className="save-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default StudentProfile;
