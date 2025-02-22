// StudentDocuments.js
import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { collection, query, where, getDocs, orderBy, doc, getDoc } from "firebase/firestore";

const StudentDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [studentDetails, setStudentDetails] = useState({
    department: "",
    year: "",
    section: ""
  });

  // Fetch student's details from Firestore
  useEffect(() => {
    const fetchStudentDetails = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            setStudentDetails({
              department: data.department || "",
              year: data.year || "",
              section: data.section || ""
            });
          } else {
            console.error("User document does not exist");
          }
        } catch (error) {
          console.error("Error fetching student details:", error);
        }
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
        // If student's details are available, filter documents accordingly
        if (studentDetails.department && studentDetails.year && studentDetails.section) {
          q = query(
            collection(db, "documents"),
            where("department", "==", studentDetails.department),
            where("year", "==", studentDetails.year),
            where("section", "==", studentDetails.section),
            orderBy("createdAt", "desc")
          );
        } else {
          // Fallback: fetch all documents (or handle missing details appropriately)
          q = query(collection(db, "documents"), orderBy("createdAt", "desc"));
        }
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setDocuments(docs);
      } catch (error) {
        console.error("Error fetching documents:", error);
        setError("Failed to load documents.");
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [studentDetails]);

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h2>Available Documents</h2>
      {loading && <p>Loading documents...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {documents.length === 0 && !loading && <p>No documents found.</p>}
      {documents.map((doc) => (
        <div key={doc.id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px", borderRadius: "5px" }}>
          <h3>{doc.title}</h3>
          <p>{doc.description}</p>
          <p>
            <strong>Department:</strong> {doc.department} | <strong>Year:</strong> {doc.year} | <strong>Section:</strong> {doc.section}
          </p>
          <a href={doc.fileURL} target="_blank" rel="noopener noreferrer" style={{ color: "blue", textDecoration: "underline" }}>
            Download Document
          </a>
        </div>
      ))}
    </div>
  );
};

export default StudentDocuments;
