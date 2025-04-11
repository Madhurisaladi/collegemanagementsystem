import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getAuth } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./StudentProfile.css";

const StudentProfile = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentId: "",
    department: "",
    section: "",
    year: "",
    semester: "",
    profilePhoto: ""
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setError("No user is logged in.");
        setLoading(false);
        return;
      }

      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFormData({
            name: userData.name || "",
            email: userData.email || "",
            studentId: userData.studentId || "",
            department: userData.department || "",
            section: userData.section || "",
            year: userData.year || "",
            semester: userData.semester || "",
            profilePhoto: userData.profilePhoto || ""
          });
        } else {
          setError("User profile not found.");
        }
      } catch (error) {
        setError("Error fetching profile.");
        console.error("Fetch error:", error);
      }
      setLoading(false);
    };
    
    fetchProfile();
  }, [user]);

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Basic validation
    if (!file.type.match('image.*')) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error("File size should be less than 5MB");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const storageRef = ref(
        storage,
        `profile/${formData.department}/${formData.year}/${formData.section}/${user.uid}_${file.name}`
      );
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
            if (formData.profilePhoto) {
              try {
                const oldPhotoRef = ref(storage, formData.profilePhoto);
                await deleteObject(oldPhotoRef);
              } catch (error) {
                if (error.code !== "storage/object-not-found") {
                  console.error("Error deleting old photo:", error);
                }
              }
            }
            
            // Update state and Firestore
            const userDocRef = doc(db, "users", user.uid);
            await updateDoc(userDocRef, { profilePhoto: downloadURL });
            setFormData(prev => ({ ...prev, profilePhoto: downloadURL }));
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
    if (!user) {
      toast.error("User not authenticated");
      return;
    }
    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, { 
        year: formData.year, 
        semester: formData.semester 
      });
      toast.success("Profile updated successfully!");
      navigate("/student-dashboard");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="student-profile-container">
      <ToastContainer position="top-center" autoClose={3000} />
      
      <nav className="navbar">
        <ul>
          <li><Link to="/student-dashboard">Home</Link></li>
          <li><Link to="/student-notifications">Notifications</Link></li>
          <li><Link to="/student-feedback">Give Feedback</Link></li>
          <li><Link to="/student-documents">Documents</Link></li>
          <li><Link to="/" className="nav-logout">Logout</Link></li>
        </ul>
      </nav>

      <div className="profile-wrapper">
        <div className="logo-container">
          <div className="profile-photo-wrapper">
            <img
              src={formData.profilePhoto || "https://upload.wikimedia.org/wikipedia/en/5/54/Bullayya_College_logo.png"}
              alt="Profile"
              className="logo"
            />
            <div
              className={`edit-icon ${isUploading ? 'uploading' : ''}`}
              onClick={() => !isUploading && fileInputRef.current.click()}
              title="Change profile photo"
            >
              {isUploading ? '⏳' : '✏️'}
            </div>
            <input
              type="file"
              onChange={handlePhotoChange}
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              disabled={isUploading}
            />
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

        <form onSubmit={(e) => e.preventDefault()} className="profile-form">
          {step === 1 && (
            <>
              <h2>Personal Information</h2>
              <div className="form-group">
                <label>Name:</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  className="form-input" 
                  disabled 
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input 
                  type="email" 
                  value={formData.email} 
                  className="form-input" 
                  disabled 
                />
              </div>
              <div className="form-group">
                <label>Student ID:</label>
                <input 
                  type="text" 
                  value={formData.studentId} 
                  className="form-input" 
                  disabled 
                />
              </div>

              <button 
                type="button" 
                className="next-button" 
                onClick={() => setStep(2)}
                disabled={isUploading}
              >
                Next
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h2>Academic Information</h2>
              <div className="form-group">
                <label>Department:</label>
                <input 
                  type="text" 
                  value={formData.department} 
                  className="form-input" 
                  disabled 
                />
              </div>
              <div className="form-group">
                <label>Section:</label>
                <input 
                  type="text" 
                  value={formData.section} 
                  className="form-input" 
                  disabled 
                />
              </div>
              <div className="form-group">
                <label>Year:</label>
                <select 
                  name="year"
                  value={formData.year} 
                  onChange={handleInputChange} 
                  className="form-input"
                  disabled={isUploading}
                >
                  <option value="">Select Year</option>
                  <option value="1st">1st</option>
                  <option value="2nd">2nd</option>
                  <option value="3rd">3rd</option>
                  <option value="4th">4th</option>
                </select>
              </div>
              <div className="form-group">
                <label>Semester:</label>
                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleInputChange}
                  className="form-input"
                  disabled={isUploading}
                >
                  <option value="">Select Semester</option>
                  <option value="1st">1st</option>
                  <option value="2nd">2nd</option>
                </select>
              </div>

              <div className="button-group">
                <button 
                  type="button" 
                  className="prev-button" 
                  onClick={() => setStep(1)}
                  disabled={isUploading}
                >
                  Previous
                </button>
                <button 
                  type="button" 
                  className="save-button" 
                  onClick={handleSave}
                  disabled={isUploading}
                >
                  Save Changes
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default StudentProfile;