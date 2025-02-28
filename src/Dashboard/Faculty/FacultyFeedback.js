import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import { db } from "../../firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

const AdminFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const feedbackPerPage = 5;

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

        console.log("Fetched Feedback:", feedbackData); // ✅ Debugging log
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

  // Pagination Logic
  const indexOfLastFeedback = currentPage * feedbackPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbackPerPage;
  const currentFeedback = feedbackList.slice(indexOfFirstFeedback, indexOfLastFeedback);

  return (
    <div>
      {/* ✅ Navbar */}
      <nav className="navbar">
        <ul>
          <li><Link to="/admin-dashboard">Home</Link></li>
          <li><Link to="/register">New Registration</Link></li>
          <li><Link to="/AdminNotification">Send Notifications</Link></li>
          <li><Link to="/admin-feedback">Feedback</Link></li>
          <li><Link to="/edit-profile">Profile</Link></li>
          <li><Link to="/" className="nav-logout">Logout</Link></li>
        </ul>
      </nav>

      <div style={styles.container}>
        <h2 style={styles.heading}>All Student Feedback</h2>

        {loading && <p style={styles.loading}>Loading feedback...</p>}
        {error && <p style={styles.error}>{error}</p>}
        {!loading && feedbackList.length === 0 && <p style={styles.noFeedback}>No feedback found.</p>}

        {currentFeedback.map((feedback) => (
          <div key={feedback.id} style={styles.feedbackItem}>
            <strong>{feedback?.studentName || "Unknown Student"}:</strong>
            <p>{feedback.message || "No message provided."}</p>
            <small>
              <em>
                {feedback.department} - {feedback.year} Year, {feedback.semester} Sem, Section {feedback.section}
              </em>
            </small>
          </div>
        ))}

        {/* ✅ Pagination */}
        <div style={styles.pagination}>
          <button 
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
            disabled={currentPage === 1}
            style={styles.button}
          >
            Previous
          </button>
          <span style={styles.pageNumber}>Page {currentPage}</span>
          <button 
            onClick={() => setCurrentPage((prev) => (indexOfLastFeedback < feedbackList.length ? prev + 1 : prev))}
            disabled={indexOfLastFeedback >= feedbackList.length}
            style={styles.button}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

// ✅ Improved Styling
const styles = {
  container: {
    maxWidth: "380px", // Reduced width slightly to make it smaller
    margin: "80px auto", // Increased top margin for more space between navbar and container
    padding: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.85)", // Slightly increased opacity for better background blend
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(6px)",
  },
  heading: {
    textAlign: "center",
    color: "#333",
  },
  loading: {
    textAlign: "center",
    fontStyle: "italic",
  },
  error: {
    textAlign: "center",
    color: "red",
  },
  noFeedback: {
    textAlign: "center",
    color: "#555",
  },
  feedbackItem: {
    padding: "12px",
    borderBottom: "1px solid #ddd",
    backgroundColor: "rgba(255, 255, 255, 0.95)", // Increased opacity for better readability
    borderRadius: "5px",
    marginBottom: "12px",
  },
  pagination: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "30px", // Added more space above pagination
  },
  button: {
    padding: "8px 15px",
    fontSize: "14px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  pageNumber: {
    fontWeight: "bold",
  },
};
export default AdminFeedback;
