import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase.js";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import "../components/styles.css"; // Adjust the path if needed
 // Import the updated CSS file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setResetMessage("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));

      if (userDoc.exists()) {
        const userRole = userDoc.data().role;
        if (userRole === "admin") {
          navigate("/admin-dashboard");
        } else if (userRole === "faculty") {
          navigate("/faculty-dashboard");
        } else if (userRole === "student") {
          navigate("/student-dashboard");
        } else {
          setError("Invalid role assigned to user");
        }
      } else {
        setError("User data not found in Firestore.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email to reset the password.");
      return;
    }
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      setResetMessage("Password reset email sent! Please check your inbox.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/accommodation">Accommodation</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/food">Food</Link></li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="https://formbuilder.ccavenue.com/live/the-society-for-collegiate-education"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fees Payment
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Login Section */}
      <div className="login-container">
        <div className="login-box">
          <div className="text-center mb-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/5/54/Bullayya_College_logo.png"
              alt="Logo"
              className="login-logo"
            />
          </div>

          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleLogin} autoComplete="off">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
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
                autoComplete="off"
              />
            </div>
            {error && <p className="text-danger text-center">{error}</p>}
            {resetMessage && <p className="text-success text-center">{resetMessage}</p>}
          
            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>
          <div className="d-grid mb-3">
            <button type="button" className="btn btn-link" onClick={handleForgotPassword}>
              Forgot Password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
