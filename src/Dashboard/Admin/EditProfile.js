import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase"; // Corrected import
import { getAuth } from "firebase/auth";
import "./EditProfile.css";

const EditProfile = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Fetch the current user's profile data from Firestore
    const fetchProfile = async () => {
      try {
        const userDocRef = doc(db, "users", user.uid); // Reference to user's Firestore document
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setName(userDoc.data().name); // Set the current name
          setEmail(userDoc.data().email); // Set the current email (this will not be editable)
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
      const userDocRef = doc(db, "users", user.uid); // Reference to the user's document in Firestore
      await updateDoc(userDocRef, { name }); // Update only the name field in Firestore
      alert("Profile updated successfully!");
      navigate("/admin-dashboard"); // Navigate to Admin Dashboard
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="edit-profile-container">
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

