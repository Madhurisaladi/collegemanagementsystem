import React, { useState } from "react";
import { db, auth, storage } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AdmNotification.css";

const NotificationForm = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [section, setSection] = useState("");
  const [semester, setSemester] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadTask, setUploadTask] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    
    if (!selectedFile) return;
    
    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error("Only PDF, JPEG, and PNG files are allowed.");
      return;
    }
    
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB.");
      return;
    }
    
    setFile(selectedFile);
    toast.success("File selected successfully!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!title || !message || !notificationType || !department || !year || !section || !semester) {
      toast.error("Please fill in all required fields.");
      return;
    }
    
    setLoading(true);
    setProgress(0);

    try {
      let fileURL = null;
      
      // Upload file if selected
      if (file) {
        const storageRef = ref(storage, `notifications/${Date.now()}_${file.name}`);
        const task = uploadBytesResumable(storageRef, file);
        setUploadTask(task);

        // Set up upload progress tracking
        const unsubscribe = task.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
          },
          (error) => {
            console.error("Upload error:", error);
            toast.error("Failed to upload file.");
            setLoading(false);
            setProgress(0);
            setUploadTask(null);
          },
          async () => {
            fileURL = await getDownloadURL(task.snapshot.ref);
            await saveNotification(fileURL);
            setUploadTask(null);
          }
        );
      } else {
        await saveNotification(null);
      }
    } catch (error) {
      console.error("Error in submission:", error);
      toast.error("An error occurred during submission.");
      setLoading(false);
      setProgress(0);
      setUploadTask(null);
    }
  };

  const saveNotification = async (fileURL) => {
    try {
      await addDoc(collection(db, "notifications"), {
        title,
        message,
        notificationType,
        department,
        year,
        section,
        semester,
        fileURL,
        facultyId: auth.currentUser?.uid,
        createdAt: serverTimestamp(),
      });
      
      toast.success("Notification sent successfully!");
      
      // Reset form
      setTitle("");
      setMessage("");
      setNotificationType("");
      setDepartment("");
      setYear("");
      setSection("");
      setSemester("");
      setFile(null);
    } catch (err) {
      console.error("Error sending notification:", err);
      toast.error("Failed to send notification.");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <div className="notification-form-container">
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <div className="notification-form">
        <h2 className="form-title">Send Notification</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Notification Type:</label>
            <select
              className="form-select"
              value={notificationType}
              onChange={(e) => setNotificationType(e.target.value)}
              required
            >
              <option value="">Select Notification Type</option>
              <option value="General">General</option>
              <option value="Attendance">Attendance</option>
              <option value="Placement">Placement</option>
              <option value="Sports">Sports</option>
              <option value="Result">Result</option>
              <option value="Fees">Fees</option>
              <option value="Time Table">Time Table</option>
              <option value="Holidays">Holidays</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Title:</label>
            <input
              type="text"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Message:</label>
            <textarea
              className="form-textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Department:</label>
            <select
              className="form-select"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <option value="">Select Department</option>
              <option value="ALL">All Departments</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Year:</label>
            <select
              className="form-select"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            >
              <option value="">Select Year</option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Section:</label>
            <select
              className="form-select"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              required
            >
              <option value="">Select Section</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Semester:</label>
            <select
              className="form-select"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              required
            >
              <option value="">Select Semester</option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Attach File:</label>
            <input
              type="file"
              className="file-input"
              onChange={handleFileChange}
              disabled={loading}
            />
            {file && (
              <div className="file-info">
                <span>{file.name}</span>
                <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
              </div>
            )}
          </div>
          
          {(progress > 0 && progress < 100) && (
            <div className="form-group">
              <div className="progress-container">
                <div className="progress-bar">
                  <div 
                    className="progress" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span>{Math.round(progress)}% uploaded</span>
              </div>
            </div>
          )}
          
          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                {uploadTask ? "Uploading..." : "Sending..."}
              </>
            ) : "Send Notification"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NotificationForm;