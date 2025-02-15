import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase.js";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [isAnimating, setIsAnimating] = useState({ login: false, forgot: false });
  const navigate = useNavigate();

  // Clear credentials on component mount
  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setResetMessage("");
    setIsAnimating({ ...isAnimating, login: true });

    try {
      // Step 1: Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Step 2: Get the user role from Firestore
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      
      if (userDoc.exists()) {
        const userRole = userDoc.data().role;
        
        // Step 3: Get complete profile based on role
        if (userRole === "student") {
          const studentDoc = await getDoc(doc(db, "students", userCredential.user.uid));
          if (studentDoc.exists()) {
            const studentData = studentDoc.data();
            localStorage.setItem('userProfile', JSON.stringify({
              ...studentData,
              role: userRole,
              uid: userCredential.user.uid
            }));
            navigate("/student-dashboard");
          } else {
            setError("Student profile not found.");
          }
        } else if (userRole === "faculty") {
          const facultyDoc = await getDoc(doc(db, "faculty", userCredential.user.uid));
          if (facultyDoc.exists()) {
            const facultyData = facultyDoc.data();
            localStorage.setItem('userProfile', JSON.stringify({
              ...facultyData,
              role: userRole,
              uid: userCredential.user.uid
            }));
            navigate("/faculty-dashboard");
          } else {
            setError("Faculty profile not found.");
          }
        } else if (userRole === "admin") {
          const adminDoc = await getDoc(doc(db, "admins", userCredential.user.uid));
          if (adminDoc.exists()) {
            const adminData = adminDoc.data();
            localStorage.setItem('userProfile', JSON.stringify({
              ...adminData,
              role: userRole,
              uid: userCredential.user.uid
            }));
            navigate("/admin-dashboard");
          } else {
            setError("Admin profile not found.");
          }
        } else {
          setError("Invalid role assigned to user");
        }
      } else {
        setError("User data not found in Firestore.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
    } finally {
      setIsAnimating({ ...isAnimating, login: false });
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email to reset the password.");
      return;
    }
    setError("");
    setIsAnimating({ ...isAnimating, forgot: true });

    setTimeout(() => setIsAnimating({ ...isAnimating, forgot: false }), 1000); // Reset animation

    try {
      await sendPasswordResetEmail(auth, email);
      setResetMessage("Password reset email sent! Please check your inbox.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        {/* Add Logo Above Title */}
        <div className="text-center mb-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/5/54/Bullayya_College_logo.png" // Your logo URL
            alt="Logo"
            style={{ maxWidth: "200px", marginBottom: "10px" }}
          />
        </div>

        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin} autoComplete="off">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off" // Disable autocomplete for this field
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off" // Disable autocomplete for this field
            />
          </div>
          {error && <p className="text-danger text-center">{error}</p>}
          {resetMessage && <p className="text-success text-center">{resetMessage}</p>}
        
          <div className="d-grid mb-3">
            <button
              type="submit"
              className={`btn btn-primary ${isAnimating.login ? "animate__animated animate__pulse" : ""}`}
            >
              Login
            </button>
          </div>
        </form>
        <div className="d-grid mb-3">
          <button
            type="button"
            className={`btn btn-link ${isAnimating.forgot ? "animate__animated animate__pulse" : ""}`}
            style={{ textDecoration: "none" }}
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
