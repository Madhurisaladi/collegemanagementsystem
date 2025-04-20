import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getAuth } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./FacultyProfile.css";

const FacultyProfile = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setName(userData.name);
            setEmail(userData.email);
            setDepartment(userData.department);
            setFacultyId(userData.facultyId);
            setProfilePhoto(userData.profilePhoto || "");
          } else {
            setError("User profile not found in Firestore.");
          }
        } catch (error) {
          setError("Error fetching profile data.");
        }
      } else {
        setError("No user is logged in.");
      }
    };

    fetchProfile();
  }, [user]);

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const storageRef = ref(storage, `profile/faculty/${department}/${user.uid}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Upload error:", error);
          toast.error("Failed to upload profile photo");
          setIsUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          try {
            // Delete old profile photo if it exists
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
            
            // Update Firestore with new profile photo URL
            const userDocRef = doc(db, "users", user.uid);
            await updateDoc(userDocRef, { profilePhoto: downloadURL });
            setProfilePhoto(downloadURL);
            toast.success("Profile photo updated successfully!");
          } catch (error) {
            console.error("Error updating profile photo:", error);
            toast.error("Failed to update profile photo");
          }
          setIsUploading(false);
          setUploadProgress(0);
        }
      );
    } catch (error) {
      console.error("Error during photo upload:", error);
      toast.error("Failed to upload profile photo");
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        name,
        department,
        facultyId
      });
      toast.success("Profile updated successfully!");
      navigate("/faculty-dashboard");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="faculty-profile-container">
      <ToastContainer position="top-center" autoClose={3000} />

      {/* Centered Header Section */}
      <div className="profile-header">
        <div className="logo-container">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/5/54/Bullayya_College_logo.png"
            alt="College Logo"
            className="logo"
          />
        </div>

        {/* Profile Photo Section */}
        <div className="profile-photo-section">
          <div className="profile-photo-wrapper">
            <img
              src={profilePhoto || "https://via.placeholder.com/150"}
              alt="Profile"
              className="profile-photo"
            />
            <label className={`edit-icon ${isUploading ? 'uploading' : ''}`}>
              {isUploading ? '⏳' : '✏️'}
              <input
                type="file"
                onChange={handlePhotoChange}
                style={{ display: "none" }}
                accept="image/*"
                disabled={isUploading}
              />
            </label>
          </div>

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="progress-container">
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <span>{Math.round(uploadProgress)}%</span>
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Header */}
      <h1 className="profile-title">Faculty Profile</h1>

      {/* Profile Form */}
      <form onSubmit={(e) => e.preventDefault()} className="profile-form">
        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            className="form-input"
            disabled
          />
        </div>

        <div className="form-group">
          <label>Department:</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Faculty ID:</label>
          <input
            type="text"
            value={facultyId}
            onChange={(e) => setFacultyId(e.target.value)}
            className="form-input"
          />
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="save-button"
          disabled={isUploading}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default FacultyProfile;
