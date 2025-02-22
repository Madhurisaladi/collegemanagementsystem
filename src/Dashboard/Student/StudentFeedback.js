import { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { collection, doc, getDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            console.log("Fetched student details:", data);
          } else {
            console.log("No user document found for UID:", user.uid);
          }
        } catch (error) {
          console.error("Error fetching student details:", error);
        }
      } else {
        console.log("No user is authenticated");
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
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h2>Submit Feedback</h2>
      {error && <p style={{ color: "red" }} aria-live="assertive">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="message">Your Feedback:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your feedback here..."
          rows="5"
          style={{ width: "100%", padding: "10px", marginTop: "10px" }}
          required
        />
        <button type="submit" disabled={loading} style={{ marginTop: "10px" }}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default StudentFeedback;
