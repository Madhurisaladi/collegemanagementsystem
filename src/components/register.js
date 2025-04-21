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
      setTimeout(() => navigate("/admin-dashboard"), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <ul>
          <li><Link to="/admin-dashboard">Home</Link></li>
          <li><Link to="/admin-feedback">Feedback</Link></li>
          <li><Link to="/edit-profile">Profile</Link></li>
          <li><Link to="/" className="nav-logout">Logout</Link></li>
        </ul>
      </nav>

      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow p-4" style={{ maxWidth: "500px", width: "100%" }}>
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

            {(role === "student" || role === "faculty") && (
              <div className="mb-3">
                <label htmlFor="department" className="form-label">Department</label>
                <select id="department" className="form-select" value={department} onChange={(e) => setDepartment(e.target.value)} required>
                  <option value="">Select Department</option>
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="MECH">MECH</option>
                  <option value="CIVIL">CIVIL</option>
                </select>
              </div>
            )}

            {role === "student" && (
              <>
                <div className="mb-3">
                  <label htmlFor="year" className="form-label">Year</label>
                  <select id="year" className="form-select" value={year} onChange={(e) => setYear(e.target.value)} required>
                    <option value="">Select Year</option>
                    <option value="1st">1st Year</option>
                    <option value="2nd">2nd Year</option>
                    <option value="3rd">3rd Year</option>
                    <option value="4th">4th Year</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="section" className="form-label">Section</label>
                  <select id="section" className="form-select" value={section} onChange={(e) => setSection(e.target.value)} required>
                    <option value="">Select Section</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="semester" className="form-label">Semester</label>
                  <select id="semester" className="form-select" value={semester} onChange={(e) => setSemester(e.target.value)} required>
                    <option value="">Select Semester</option>
                    <option value="1st">1st Semester</option>
                    <option value="2nd">2nd Semester</option>
                  </select>
                </div>
              </>
            )}

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
