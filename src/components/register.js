import React, { useState } from "react";
import { auth, db } from "../firebase"; // Ensure Firebase is initialized correctly
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore"; // Firestore to set role
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const Register = () => {
  // State variables for the form
  const [role, setRole] = useState(""); // Role selected (student, faculty, admin)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [studentId, setStudentId] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [year, setYear] = useState(""); // Year state
  const [section, setSection] = useState(""); // Section state
  const [semester, setSemester] = useState(""); // Semester state
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const departments = [
    { code: "CSE", name: "Computer Science and Engineering" },
    { code: "EEE", name: "Electrical and Electronics Engineering" },
    { code: "ECE", name: "Electronics and Communication Engineering" },
    { code: "MECH", name: "Mechanical Engineering" },
    { code: "CIVIL", name: "Civil Engineering" },
    { code: "IT", name: "Information Technology" },
    { code: "CHEM", name: "Chemical Engineering" },
  ];

  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
  const sections = ["A", "B"];
  const semesters = ["1st Semester", "2nd Semester"]; // Semester options

  const navigate = useNavigate(); // Initialize navigate function

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setStudentId("");
    setFacultyId("");
    setDepartment("");
    setYear("");
    setSection("");
    setSemester(""); // Reset semester when role changes
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        role: role,
        department: department,
        studentId: role === "student" ? studentId : "",
        facultyId: role === "faculty" ? facultyId : "",
        year: role === "student" ? year : "",
        section: role === "student" ? section : "",
        semester: role === "student" ? semester : "", // Add semester to Firestore
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
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ maxWidth: "500px", width: "100%" }}>
        {/* Logo */}
        <div className="text-center mb-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/5/54/Bullayya_College_logo.png"
            alt="College Logo"
            style={{ width: "120px", height: "120px", borderRadius: "50%" }}
          />
        </div>

        <h2 className="text-center mb-4">Register</h2>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Register as</label>
            <select
              id="role"
              className="form-select"
              value={role}
              onChange={handleRoleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {role === "student" && (
            <>
              <div className="mb-3">
                <label htmlFor="studentId" className="form-label">Student ID</label>
                <input
                  type="text"
                  id="studentId"
                  className="form-control"
                  placeholder="Enter your student ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="year" className="form-label">Year</label>
                <select
                  id="year"
                  className="form-select"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                >
                  <option value="">Select Year</option>
                  {years.map((yr) => (
                    <option key={yr} value={yr}>{yr}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="section" className="form-label">Section</label>
                <select
                  id="section"
                  className="form-select"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  required
                >
                  <option value="">Select Section</option>
                  {sections.map((sec) => (
                    <option key={sec} value={sec}>{sec}</option>
                  ))}
                </select>
              </div>

              {/* Semester Dropdown */}
              <div className="mb-3">
                <label htmlFor="semester" className="form-label">Semester</label>
                <select
                  id="semester"
                  className="form-select"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  required
                >
                  <option value="">Select Semester</option>
                  {semesters.map((sem) => (
                    <option key={sem} value={sem}>{sem}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          {role === "faculty" && (
            <div className="mb-3">
              <label htmlFor="facultyId" className="form-label">Faculty ID</label>
              <input
                type="text"
                id="facultyId"
                className="form-control"
                placeholder="Enter your faculty ID"
                value={facultyId}
                onChange={(e) => setFacultyId(e.target.value)}
                required
              />
            </div>
          )}

          {(role === "student" || role === "faculty") && (
            <div className="mb-3">
              <label htmlFor="department" className="form-label">Department</label>
              <select
                id="department"
                className="form-select"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.code} value={dept.code}>
                    {dept.name} ({dept.code})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-primary">Register</button>
          </div>

          {error && <p className="text-danger text-center">{error}</p>}
          {success && <p className="text-success text-center">{success}</p>}
        </form>

        {/* Button to return to admin dashboard */}
        <div className="d-grid">
          <button className="btn btn-secondary" onClick={() => navigate("/admin-dashboard")}>
            Return to Admin Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;