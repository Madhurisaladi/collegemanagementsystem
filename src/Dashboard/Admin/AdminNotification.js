import React, { useState } from "react";
import { db, auth, storage } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  // File validation and state update
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (selectedFile && !allowedTypes.includes(selectedFile.type)) {
      toast.error("Only PDF, JPEG, and PNG files are allowed.");
      setFile(null);
    } else if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB.");
      setFile(null);
    } else {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !title ||
      !message ||
      !notificationType ||
      !department ||
      !year ||
      !section ||
      !semester
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);

    let fileURL = null;

    // Upload file if selected
    if (file) {
      const storageRef = ref(storage, `notifications/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Error uploading file:", error);
          toast.error("Failed to upload file.");
          setLoading(false);
        },
        async () => {
          fileURL = await getDownloadURL(uploadTask.snapshot.ref);
          saveNotification(fileURL);
        }
      );
    } else {
      // If no file is selected, save the notification
      saveNotification(fileURL);
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
        facultyId: auth.currentUser.uid,
        createdAt: serverTimestamp(),
      });
      toast.success("Notification sent successfully!");
      setTitle("");
      setMessage("");
      setNotificationType("");
      setDepartment("");
      setYear("");
      setSection("");
      setSemester("");
      setFile(null);
      setProgress(0);
    } catch (err) {
      console.error("Error sending notification:", err);
      toast.error("Failed to send notification.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2>Send Notification</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Notification Type:</label>
          <select
            value={notificationType}
            onChange={(e) => setNotificationType(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "8px 0" }}
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
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "8px 0" }}
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "8px 0" }}
          />
        </div>
        <div>
          <label>Department:</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "8px 0" }}
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
        <div>
          <label>Year:</label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "8px 0" }}
          >
            <option value="">Select Year</option>
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
            <option value="3rd">3rd</option>
            <option value="4th">4th</option>
          </select>
        </div>
        <div>
          <label>Section:</label>
          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "8px 0" }}
          >
            <option value="">Select Section</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
        </div>
        <div>
          <label>Semester:</label>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "8px 0" }}
          >
            <option value="">Select Semester</option>
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
          </select>
        </div>
        <div>
          <label>Attach File:</label>
          <input
            type="file"
            onChange={handleFileChange}
            style={{ width: "100%", margin: "8px 0" }}
          />
        </div>
        {file && (
          <div style={{ margin: "10px 0" }}>
            <progress value={progress} max="100" style={{ width: "100%" }} />
            <span>{Math.round(progress)}%</span>
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: "10px", padding: "10px 20px" }}
        >
          {loading ? "Sending..." : "Send Notification"}
        </button>
      </form>
    </div>
  );
};

export default NotificationForm;
