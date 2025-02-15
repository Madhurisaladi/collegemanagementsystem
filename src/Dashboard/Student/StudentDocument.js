import React, { useEffect, useState } from "react";
import { db } from "../../firebase"; // Adjusted path
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext"; // Adjusted path

const StudentDocument = () => {
  const [documents, setDocuments] = useState([]);
  const [department, setDepartment] = useState(""); // To store student's department
  const { currentUser } = useAuth(); // Get logged-in student info

  useEffect(() => {
    const fetchStudentDepartment = async () => {
      if (!currentUser) return;

      try {
        // Fetch student's department from Firestore users collection
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setDepartment(userDoc.data().department);
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentDepartment();
  }, [currentUser]);

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!department) return;

      try {
        const q = query(collection(db, "documents"), where("department", "==", department));
        const querySnapshot = await getDocs(q);
        setDocuments(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, [department]);

  return (
    <div>
      <h2>Available Documents</h2>
      {documents.length === 0 ? (
        <p>No documents available for your department.</p>
      ) : (
        <ul>
          {documents.map(doc => (
            <li key={doc.id}>
              <strong>{doc.title}</strong> - 
              <a href={doc.url} target="_blank" rel="noopener noreferrer">Download</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentDocument;
