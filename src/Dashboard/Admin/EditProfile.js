import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Adjust the path based on your project structure
import { getAuth } from "firebase/auth";

const EditProfile = () => {
  const navigate = useNavigate();
  const auth = getAuth(); // Firebase Authentication
  const user = auth.currentUser; // Get the currently logged-in user
  const [name, setName] = useState("");

  useEffect(() => {
    // Fetch the current user's profile data from Firestore
    const fetchProfile = async () => {
      try {
        const userDocRef = doc(db, "users", user.uid); // Assume the user's data is stored in a "users" collection
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setName(userDoc.data().name); // Set the current name from Firestore
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
      await updateDoc(userDocRef, { name }); // Update the name field in Firestore
      alert("Profile updated successfully!");
      navigate("/admin-dashboard"); // Navigate to Admin Dashboard
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="edit-profile-container">
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

        <button type="button" onClick={handleSave} className="save-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;

