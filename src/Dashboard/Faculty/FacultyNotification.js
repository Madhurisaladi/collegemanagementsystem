import React, { useState } from "react";
import { db, auth, storage } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./NotificationForm.css"; // Import CSS

const NotificationForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    notificationType: "",
    department: "",
    year: "",
    section: "",
    semester: "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // File Validation
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(formData).some((value) => !value)) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    let fileURL = null;

    if (file) {
      const storageRef = ref(storage, `notifications/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {
          toast.error("Failed to upload file.");
          setLoading(false);
        },
        async () => {
          fileURL = await getDownloadURL(uploadTask.snapshot.ref);
          saveNotification(fileURL);
        }
      );
    } else {
      saveNotification(fileURL);
    }
  };

  const saveNotification = async (fileURL) => {
    try {
      await addDoc(collection(db, "notifications"), {
        ...formData,
        fileURL,
        facultyId: auth.currentUser.uid,
        createdAt: serverTimestamp(),
      });

      toast.success("Notification sent successfully!");
      setFormData({
        title: "",
        message: "",
        notificationType: "",
        department: "",
        year: "",
        section: "",
        semester: "",
      });
      setFile(null);
      setProgress(0);
    } catch (err) {
      toast.error("Failed to send notification.");
    }
    setLoading(false);
  };

  return (
    <div className="notification-container">
      <div className="notification-card">
        <h2 className="notification-header">Send Notification</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Notification Type:</label>
            <select name="notificationType" value={formData.notificationType} onChange={handleChange} required>
              <option value="">Select Notification Type</option>
              {["General", "Attendance", "Placement", "Sports", "Result", "Fees", "Time Table", "Holidays"].map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Title:</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Message:</label>
            <textarea name="message" value={formData.message} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Department:</label>
            <select name="department" value={formData.department} onChange={handleChange} required>
              <option value="">Select Department</option>
              {["ALL", "CSE", "ECE", "EEE", "MECH", "CIVIL"].map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Year:</label>
            <select name="year" value={formData.year} onChange={handleChange} required>
              <option value="">Select Year</option>
              {["1st", "2nd", "3rd", "4th"].map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Section:</label>
            <select name="section" value={formData.section} onChange={handleChange} required>
              <option value="">Select Section</option>
              {["A", "B"].map((sec) => (
                <option key={sec} value={sec}>{sec}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Semester:</label>
            <select name="semester" value={formData.semester} onChange={handleChange} required>
              <option value="">Select Semester</option>
              {["1st", "2nd"].map((sem) => (
                <option key={sem} value={sem}>{sem}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Attach File:</label>
            <input type="file" onChange={handleFileChange} />
          </div>

          {file && (
            <div className="progress-bar">
              <progress value={progress} max="100" />
              <span>{Math.round(progress)}%</span>
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Sending..." : "Send Notification"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NotificationForm;
