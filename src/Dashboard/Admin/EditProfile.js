import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import "./EditProfile.css";

const EditProfile = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const fileInputRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          setName(data.name);
          setEmail(data.email);
          setProfilePhoto(data.profilePhoto || "");
        } else {
          console.error("User profile not found in Firestore.");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [user.uid]);

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // For admin, using a similar storage path as student profile.
    // Using default values "admin/NA/NA" since admin may not have department/year/section.
    const storageRef = ref(storage, `profile/admin/NA/NA/${user.uid}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Upload error:", error);
        alert("Failed to upload profile photo.");
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        try {
          // Delete old profile photo if it exists, ignoring error if file not found
          if (profilePhoto) {
            try {
              const oldPhotoRef = ref(storage, profilePhoto);
              await deleteObject(oldPhotoRef);
            } catch (error) {
              if (error.code !== "storage/object-not-found") {
                console.error("Error deleting old photo:", error);
              }
            }
          }
          // Update Firestore with the new profile photo URL
          const userDocRef = doc(db, "users", user.uid);
          await updateDoc(userDocRef, { profilePhoto: downloadURL });
          setProfilePhoto(downloadURL);
          alert("Profile photo updated successfully!");
        } catch (error) {
          console.error("Error updating profile photo:", error);
          alert("Failed to update profile photo.");
        }
      }
    );
  };

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
          <li><Link to="/" className="nav-logout">Logout</Link></li>
        </ul>
      </nav>

      {/* Profile Photo Section at Top */}
      <div className="profile-photo-section">
        <div className="profile-photo-wrapper">
          <img
            src={profilePhoto || "https://via.placeholder.com/150"}
            alt="Profile"
            className="profile-photo"
          />
          <div
            className="edit-icon"
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          >
            &#128247;
          </div>
        </div>
        <input
          type="file"
          onChange={handlePhotoChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="progress">
            <div className="progress-bar" style={{ width: `${uploadProgress}%` }}>
              {Math.round(uploadProgress)}%
            </div>
          </div>
        )}
      </div>

      {/* Edit Profile Form */}
      <form onSubmit={(e) => e.preventDefault()} className="profile-form">
        <h1>Edit Profile</h1>
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
