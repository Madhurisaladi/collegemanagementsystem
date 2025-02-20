import React, { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [studentId, setStudentId] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [year, setYear] = useState("");
  const [section, setSection] = useState("");
  const [semester, setSemester] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role,
        department,
        studentId: role === "student" ? studentId : "",
        facultyId: role === "faculty" ? facultyId : "",
        year: role === "student" ? year : "",
        section: role === "student" ? section : "",
        semester: role === "student" ? semester : "",
        timestamp: new Date(),
      });
      setEmail("");
      setPassword("");
      setName("");
      setRole("");
      setDepartment("");
      setStudentId("");
      setFacultyId("");
      setYear("");
      setSection("");
      setSemester("");
      setSuccess("User registered successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <ul>
          <li><Link to="/admin-dashboard">Home</Link></li>
          <li><Link to="/AdminNotification">Send Notifications</Link></li>
          <li><Link to="/admin-feedback">Feedback</Link></li>
          <li><Link to="/edit-profile">Profile</Link></li>
          <li><Link to="/" className="nav-logout">Logout</Link></li>
        </ul>
      </nav>

      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow p-4" style={{ maxWidth: "500px", width: "100%" }}>
          <div className="text-center mb-4">
            <img src="https://upload.wikimedia.org/wikipedia/en/5/54/Bullayya_College_logo.png" alt="College Logo" style={{ width: "120px", height: "120px", borderRadius: "50%" }} />
          </div>
          <h2 className="text-center mb-4">Register</h2>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">Register as</label>
              <select id="role" className="form-select" value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" id="name" className="form-control" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" id="email" className="form-control" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" id="password" className="form-control" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary">Register</button>
            </div>
            {error && <p className="text-danger text-center">{error}</p>}
            {success && <p className="text-success text-center">{success}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
