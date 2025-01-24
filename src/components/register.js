import React, { useState } from "react";
import { auth, db } from "../firebase"; // Ensure Firebase is initialized correctly
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore"; // Firestore to set role

const Register = () => {
  // State variables for the form
  const [role, setRole] = useState("");  // Role selected (student, faculty, admin)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [studentId, setStudentId] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Department options with full forms
  const departments = [
    { code: "CSE", name: "Computer Science and Engineering" },
    { code: "EEE", name: "Electrical and Electronics Engineering" },
    { code: "ECE", name: "Electronics and Communication Engineering" },
    { code: "MECH", name: "Mechanical Engineering" },
    { code: "CIVIL", name: "Civil Engineering" },
    { code: "IT", name: "Information Technology" },
    { code: "CHEM", name: "Chemical Engineering" },
  ];

  // Handle role selection change
  const handleRoleChange = (e) => {
    setRole(e.target.value);  // Update the selected role
    // Reset other fields when the role changes
    setStudentId("");
    setFacultyId("");
    setDepartment("");
  };

  // Handle registration logic
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // Step 1: Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Step 2: Set user data in Firestore with selected role
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        role: role, // Set the role (admin, faculty, student)
        department: department,
        studentId: role === "student" ? studentId : "",  // Only add for student
        facultyId: role === "faculty" ? facultyId : "",  // Only add for faculty
        timestamp: new Date(),
      });

      setSuccess("User registered successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-center mb-4">Register</h2>

        <form onSubmit={handleRegister}>
          {/* Select Role */}
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Register as</label>
            <select
              id="role"
              className="form-select"
              value={role}
              onChange={handleRoleChange} // Update role on change
              required
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Name */}
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

          {/* Email */}
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

          {/* Password */}
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

          {/* Role-based Fields */}
          {role === "student" && (
            <>
              {/* Student ID */}
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
            </>
          )}

          {role === "faculty" && (
            <>
              {/* Faculty ID */}
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
            </>
          )}

          {/* Department Dropdown */}
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

          {/* Submit Button */}
          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>

          {/* Error and Success Messages */}
          {error && <p className="text-danger text-center">{error}</p>}
          {success && <p className="text-success text-center">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
