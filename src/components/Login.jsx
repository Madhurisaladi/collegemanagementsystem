import React, { useState } from "react";
import { auth } from "../firebase"; // Adjust the path to your firebase.js file
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error
    setResetMessage(""); // Reset reset message
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home"); // Redirect to home page
    } catch (err) {
      setError(err.message); // Display error
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email to reset the password.");
      return;
    }
    setError(""); // Reset error
    try {
      await sendPasswordResetEmail(auth, email);
      setResetMessage("Password reset email sent! Please check your inbox.");
    } catch (err) {
      setError(err.message); // Display error
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
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
            />
          </div>
          {error && <p className="text-danger text-center">{error}</p>}
          {resetMessage && <p className="text-success text-center">{resetMessage}</p>}
          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
        <div className="d-grid mb-3">
          <button
            type="button"
            className="btn btn-link"
            style={{ textDecoration: "none" }}
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </button>
        </div>
        <div className="mt-3 text-center">
          <small>
            Don't have an account? <a href="/register">Sign up</a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
