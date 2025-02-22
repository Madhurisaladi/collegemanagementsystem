import { useEffect, useState } from "react";
import { db } from "../../firebase"; 
import { collection, query, orderBy, getDocs } from "firebase/firestore";

const FacultyFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedback = async () => {
      setLoading(true);
      setError("");

      try {
        const q = query(collection(db, "feedback"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const feedbackData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFeedbackList(feedbackData);
      } catch (err) {
        console.error("Error fetching feedback:", err);
        setError("Failed to load feedback. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2>All Student Feedback</h2>

      {loading && <p>Loading feedback...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && feedbackList.length === 0 && <p>No feedback found.</p>}

      {feedbackList.map((feedback) => (
        <div key={feedback.id} style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
          <strong>{feedback.studentName}:</strong>
          <p>{feedback.message}</p>
        </div>
      ))}
    </div>
  );
};

export default FacultyFeedback;
