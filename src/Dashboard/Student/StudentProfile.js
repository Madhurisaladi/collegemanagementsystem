import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getAuth } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { toast } from "react-toastify";
import "./StudentProfile.css";

const StudentProfile = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [department, setDepartment] = useState("");
  const [section, setSection] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1); // For Next & Previous buttons

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
            setStudentId(userData.studentId);
            setDepartment(userData.department || "");
            setSection(userData.section || "");
            setYear(userData.year || "");
            setSemester(userData.semester || "");
            setProfilePhoto(userData.profilePhoto || "");
          } else {
            setError("User profile not found.");
          }
        } catch (error) {
          setError("Error fetching profile.");
        }
      } else {
        setError("No user is logged in.");
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    // Updated storage path: profile -> department -> year -> section -> user.uid_filename
    const storageRef = ref(
      storage,
      `profile/${department}/${year}/${section}/${user.uid}_${file.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.error("Upload error:", error);
        setError("Failed to upload profile photo.");
        setLoading(false);
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

          // Update Firestore with new profile photo URL
          const userDocRef = doc(db, "users", user.uid);
          await updateDoc(userDocRef, { profilePhoto: downloadURL });
          setProfilePhoto(downloadURL);
          toast.success("Profile photo updated successfully!");
        } catch (error) {
          console.error("Error updating profile photo:", error);
          setError("Failed to update profile photo.");
        }
        setLoading(false);
      }
    );
  };

  const handleSave = async () => {
    if (!user) {
      setError("User not authenticated.");
      return;
    }
    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        year,
        semester,
      });
      alert("Profile updated!");
      navigate("/student-dashboard");
    } catch (error) {
      alert("Failed to update profile.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="student-profile-container">
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/student-dashboard">Home</Link>
          </li>
          <li>
            <Link to="/view-attendance">View Attendance</Link>
          </li>
          <li>
            <Link to="/student-notifications">Notifications</Link>
          </li>
          <li>
            <Link to="/student-feedback">Give Feedback</Link>
          </li>
          <li>
            <Link to="/student-documents">Documents</Link>
          </li>
          <li>
            <Link to="/" className="nav-logout">
              Logout
            </Link>
          </li>
        </ul>
      </nav>

      <div className="profile-wrapper">
        <div className="logo-container">
          <img
            src={
              profilePhoto ||
              "https://upload.wikimedia.org/wikipedia/en/5/54/Bullayya_College_logo.png"
            }
            alt="Profile"
            className="logo"
          />
          <input type="file" onChange={handlePhotoChange} className="photo-input" />
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="profile-form">
          {step === 1 && (
            <>
              <h2>Personal Information</h2>
              <div className="form-group">
                <label>Name:</label>
                <input type="text" value={name} className="form-input" disabled />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input type="email" value={email} className="form-input" disabled />
              </div>
              <div className="form-group">
                <label>Student ID:</label>
                <input type="text" value={studentId} className="form-input" disabled />
              </div>

              <button type="button" className="next-button" onClick={() => setStep(2)}>
                Next
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h2>Academic Information</h2>
              <div className="form-group">
                <label>Department:</label>
                <input type="text" value={department} className="form-input" disabled />
              </div>
              <div className="form-group">
                <label>Section:</label>
                <input type="text" value={section} className="form-input" disabled />
              </div>
              <div className="form-group">
                <label>Year:</label>
                <select value={year} onChange={(e) => setYear(e.target.value)} className="form-input">
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
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="form-input"
                >
                  <option value="">Select Semester</option>
                  <option value="1st">1st</option>
                  <option value="2nd">2nd</option>
                </select>
              </div>

              <div className="button-group">
                <button type="button" className="prev-button" onClick={() => setStep(1)}>
                  Previous
                </button>
                <button type="button" className="save-button" onClick={handleSave}>
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
