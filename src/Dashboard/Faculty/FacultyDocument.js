import React, { useState } from "react";
import { storage, db } from "../../firebase"; // Adjusted path
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext"; // Adjusted path

const FacultyDocument = () => {
  const [file, setFile] = useState(null);
  const [department, setDepartment] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);  // Progress state
  const { currentUser } = useAuth(); // Get faculty user info

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !department) {
      alert("Please select a file and department.");
      return;
    }

    setUploading(true);
    setProgress(0);  // Reset progress before upload starts

    // Create a reference to the Firebase Storage location
    const storageRef = ref(storage, `documents/${department}/${file.name}`);
    
    // Use uploadBytesResumable for tracking progress
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Monitor progress
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPercentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercentage);  // Update progress state
      },
      (error) => {
        console.error("❌ Error uploading file:", error);
        alert("❌ Upload failed! Check console for details.");
      },
      async () => {
        // Once upload is complete, get the file URL
        const fileURL = await getDownloadURL(storageRef);

        // Save file info to Firestore
        await addDoc(collection(db, "documents"), {
          facultyId: currentUser.uid,
          department,
          title: file.name,
          url: fileURL,
          uploadedAt: serverTimestamp(),
        });

        alert("✅ File uploaded successfully!");
        setFile(null);
        setDepartment("");
        setUploading(false);
      }
    );
  };

  return (
    <div>
      <h2>Upload Document</h2>
      <select onChange={(e) => setDepartment(e.target.value)} value={department}>
        <option value="">Select Department</option>
        <option value="CSE">CSE</option>
        <option value="ECE">ECE</option>
        <option value="EEE">EEE</option>
        <option value="MECH">MECH</option>
      </select>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? `Uploading ${Math.round(progress)}%` : "Upload"}
      </button>
      {/* Display progress */}
      {uploading && <p>Uploading: {Math.round(progress)}%</p>}
    </div>
  );
};

export default FacultyDocument;

