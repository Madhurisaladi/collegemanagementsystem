import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db, auth } from "../../firebase";
import { collection, query, where, getDocs, orderBy, doc, getDoc } from "firebase/firestore";
import "./StudentDocuments.css";

const StudentDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [studentDetails, setStudentDetails] = useState({
    department: "",
    year: "",
    section: "",
  });

  // Fetch student's details from Firestore
  useEffect(() => {
    const fetchStudentDetails = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          setStudentDetails({
            department: data.department || "",
            year: data.year || "",
            section: data.section || "",
          });
        } else {
          console.error("User document does not exist");
        }
      } catch (error) {
        console.error("Error fetching student details:", error);
        setError("Failed to load student details.");
      }
    };

    fetchStudentDetails();
  }, []);

  // Fetch documents based on student's details
  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      setError("");

      try {
        let q;
        if (studentDetails.department && studentDetails.year && studentDetails.section) {
          q = query(
            collection(db, "documents"),
            where("department", "==", studentDetails.department),
            where("year", "==", studentDetails.year),
            where("section", "==", studentDetails.section),
            orderBy("createdAt", "desc")
          );
        } else {
          q = query(collection(db, "documents"), orderBy("createdAt", "desc"));
        }

        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setDocuments(docs);
      } catch (error) {
        console.error("Error fetching documents:", error);
        setError("Failed to load documents.");
      } finally {
        setLoading(false);
      }
    };

    if (studentDetails.department && studentDetails.year && studentDetails.section) {
      fetchDocuments();
    }
  }, [studentDetails]);

  return (
    <div className="documents-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <ul>
          <li><Link to="/student-dashboard">Home</Link></li>
          <li><Link to="/student-notifications">Notifications</Link></li>
        </ul>
      </nav>
      <div style={{ height: "30px" }}></div>

      {/* Page Header */}
      <div className="page-header">
        <h2>Available Documents</h2>
      </div>

      {/* Display Messages */}
      {loading && <p className="loading-message">Loading documents...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && documents.length === 0 && <p className="no-documents">No documents found.</p>}

      {/* Document List */}
      <div className="documents-list">
        {documents.map((doc) => (
          <div key={doc.id} className="document-card">
            <h3 className="document-title">{doc.title}</h3>
            <p className="document-description">{doc.description}</p>
            <p className="document-details">
              <strong>Department:</strong> {doc.department} | <strong>Year:</strong> {doc.year} | <strong>Section:</strong> {doc.section}
            </p>
            <a href={doc.fileURL} target="_blank" rel="noopener noreferrer" className="download-link">
              Download Document
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDocuments;
