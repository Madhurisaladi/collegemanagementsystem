import { useEffect, useState } from "react";
import { db } from "../../firebase"; // ✅ Ensure correct import
import { collection, query, orderBy, getDocs } from "firebase/firestore";

const FacultyFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const q = query(collection(db, "feedback"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const feedbackData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFeedbackList(feedbackData);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div>
      <h2>Student Feedback</h2>
      {feedbackList.length === 0 ? (
        <p>No feedback available</p>
      ) : (
        feedbackList.map((feedback) => (
          <div key={feedback.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
            <strong>{feedback.studentName}:</strong>
            <p>{feedback.message}</p> {/* ✅ Use 'message' instead of 'feedback' */}
            <small>
              Submitted on:{" "}
              {feedback.createdAt?.seconds
                ? new Date(feedback.createdAt.seconds * 1000).toLocaleString()
                : "Unknown"}
            </small>
          </div>
        ))
      )}
    </div>
  );
};

export default FacultyFeedback;
