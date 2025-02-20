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
  const [step, setStep] = useState(1); // Tracks the current step

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
            setDepartment(userData.department);
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
      }
    };
    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        name,
        email,
        studentId,
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

  return (
    <div className="student-profile-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/student-dashboard">Home</Link>
          </li>
          <li>
            <Link to="/view-attendance">View Attendance</Link>
          </li>
          <li>
            <Link to="/student-notifications">Notifications</Link>
          </li>
          <li>
            <Link to="/student-feedback">Give Feedback</Link>
          </li>
         
          <li>
            <Link to="/student-documents">Documents</Link>
          </li>
          <li>
            <Link to="/" className="nav-logout">
              Logout
            </Link>
          </li>
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

      {/* Multi-step form */}
      <form onSubmit={(e) => e.preventDefault()} className="profile-form">
        {step === 1 && (
          <>
            <h2>Personal Information</h2>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" value={email} className="form-input" disabled />
            </div>
            <div className="form-group">
              <label>Student ID:</label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="form-input"
              />
            </div>
            <button type="button" onClick={() => setStep(2)} className="next-button">
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2>Academic Information</h2>
            <div className="form-group">
              <label>Department:</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Section:</label>
              <input
                type="text"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Year:</label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Semester:</label>
              <input
                type="text"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="button-group">
              <button type="button" onClick={() => setStep(1)} className="prev-button">
                Back
              </button>
              <button type="button" onClick={handleSave} className="save-button">
                Save Changes
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default StudentProfile;
