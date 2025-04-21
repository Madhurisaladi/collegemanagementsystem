import React, { useState } from "react";
import { Link } from "react-router-dom";
import { db, storage, auth } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./FacultyDocumentUpload.css";

const FacultyDocumentUpload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [section, setSection] = useState("");
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setConfirmation("");
    if (!file || !title || !department || !year || !section) {
      toast.error("Please fill in all required fields and select a file");
      return;
    }
    setLoading(true);

    const storageRef = ref(storage, `documents/${department}/${year}/${section}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Upload error:", error);
        toast.error("File upload failed.");
        setLoading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        try {
          await addDoc(collection(db, "documents"), {
            title,
            description,
            department,
            year,
            section,
            fileURL: downloadURL,
            facultyId: auth.currentUser.uid,
            createdAt: serverTimestamp(),
          });
          toast.success("Document uploaded successfully!");
          setConfirmation("Document uploaded successfully!");
          setTitle("");
          setDescription("");
          setDepartment("");
          setYear("");
          setSection("");
          setFile(null);
          setUploadProgress(0);
          document.getElementById("fileInput").value = null;
        } catch (err) {
          console.error("Error saving document metadata:", err);
          toast.error("Failed to save document details.");
        }
        setLoading(false);
      }
    );
  };

  return (
    <div className="dashboard-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <ul>
          <li><Link to="/faculty-dashboard">Home</Link></li>
          <li><Link to="/" className="nav-logout">Logout</Link></li>
        </ul>
      </nav>
      <div style={{ height: "30px" }}></div>

      <div style={{ Width: "600px", margin: "auto", padding: "20px" ,background:"white"}} className="upload-document">
        <h2>Upload Document</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Document Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ width: "100%", padding: "8px", margin: "8px 0" }} />
          </div>
          <div>
            <label>Description:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: "100%", padding: "8px", margin: "8px 0" }} />
          </div>
          <div>
            <label>Department:</label>
            <select value={department} onChange={(e) => setDepartment(e.target.value)} required style={{ width: "100%", padding: "8px", margin: "8px 0" }}>
              <option value="">Select Department</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
            </select>
          </div>
          <div>
            <label>Year:</label>
            <select value={year} onChange={(e) => setYear(e.target.value)} required style={{ width: "100%", padding: "8px", margin: "8px 0" }}>
              <option value="">Select Year</option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
            </select>
          </div>
          <div>
            <label>Section:</label>
            <select value={section} onChange={(e) => setSection(e.target.value)} required style={{ width: "100%", padding: "8px", margin: "8px 0" }}>
              <option value="">Select Section</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
          <div>
            <label>Choose File:</label>
            <input id="fileInput" type="file" onChange={handleFileChange} required style={{ margin: "8px 0" }} />
          </div>
          {uploadProgress > 0 && (
            <div>
              <progress value={uploadProgress} max="100" style={{ width: "100%" }} />
              <span>{Math.round(uploadProgress)}%</span>
            </div>
          )}
          <button type="submit" disabled={loading} style={{ marginTop: "10px", padding: "10px 20px" }}>
            {loading ? "Uploading..." : "Upload Document"}
          </button>
        </form>
        {confirmation && (
          <div style={{ marginTop: "10px", padding: "10px", backgroundColor: "#e6ffe6", color: "green", borderRadius: "4px" }}>
            {confirmation}
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyDocumentUpload;