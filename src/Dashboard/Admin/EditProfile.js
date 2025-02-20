import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import "./EditProfile.css";

const EditProfile = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setName(userDoc.data().name);
          setEmail(userDoc.data().email);
        } else {
          console.error("User profile not found in Firestore.");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [user.uid]);

  const handleSave = async () => {
    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, { name });
      alert("Profile updated successfully!");
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="edit-profile-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <ul>
          <li><Link to="/admin-dashboard">Home</Link></li>
          <li><Link to="/register">New Registration</Link></li>
          <li><Link to="/AdminNotification">Send Notifications</Link></li>
          <li><Link to="/admin-feedback">Feedback</Link></li>
          <li><Link to="/edit-profile">Profile</Link></li>
          <li><Link to="/" className="nav-logout">Logout</Link></li>
        </ul>
      </nav>

      {/* Logo */}
      <div className="logo-container">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/5/54/Bullayya_College_logo.png"
          alt="College Logo"
          className="logo"
        />
      </div>

      {/* Edit Profile Header */}
      <h1>Edit Profile</h1>
      <form onSubmit={(e) => e.preventDefault()} className="profile-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
          />
        </div>

        {/* Email field - Display only */}
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            readOnly
            className="form-input"
          />
        </div>

        <button type="button" onClick={handleSave} className="save-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
