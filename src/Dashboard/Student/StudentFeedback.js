import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db, auth } from "../../firebase";
import { collection, doc, getDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./StudentFeedback.css"; // You can define styles in this file

const StudentFeedback = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [studentDetails, setStudentDetails] = useState({
    studentName: "Unknown",
    studentId: "Unknown",
    department: "Unknown",
    year: "Unknown",
    section: "Unknown",
    semester: "Unknown",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setStudentDetails({
              studentName: data.name || "Unknown",
              studentId: data.studentId || "Unknown",
              department: data.department || "Unknown",
              year: data.year || "Unknown",
              section: data.section || "Unknown",
              semester: data.semester || "Unknown",
            });
          } else {
            console.log("No user document found for UID:", user.uid);
          }
        } catch (error) {
          console.error("Error fetching student details:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!message.trim()) {
      setError("Feedback cannot be empty.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      setError("User not authenticated.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "feedback"), {
        userId: user.uid,
        studentName: studentDetails.studentName || "Unknown",
        studentId: studentDetails.studentId || "Unknown",
        department: studentDetails.department || "Unknown",
        year: studentDetails.year || "Unknown",
        section: studentDetails.section || "Unknown",
        semester: studentDetails.semester || "Unknown",
        message: message,
        createdAt: serverTimestamp(),
      });

      setMessage("");
      toast.success("Feedback submitted successfully!");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setError("Failed to submit feedback. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feedback-container">
      {/* ✅ Navigation Bar */}
      <nav className="navbar">
        <ul>
          <li><Link to="/student-dashboard">Home</Link></li>
          
          <li><Link to="/student-notifications">Notifications</Link></li>
          <li><Link to="/student-documents">Documents</Link></li>
          <li><Link to="/" className="nav-logout">Logout</Link></li>
        </ul>
      </nav>
      <div style={{ height: "50px" }}></div>

      <div className="feedback-box">
        <h2 className="feedback-title">Submit Your Feedback</h2>
        {error && <p className="error-message">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <label htmlFor="message" className="feedback-label">Your Feedback:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your feedback here..."
            rows="5"
            className="feedback-textarea"
            required
          />
          <button type="submit" className="feedback-button" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentFeedback;
