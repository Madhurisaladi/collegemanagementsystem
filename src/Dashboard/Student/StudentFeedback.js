import { useState } from "react";
import { db, auth } from "../../firebase"; // Ensure correct path
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify"; // Import toast for better notifications
import "react-toastify/dist/ReactToastify.css"; // Toast styles

const StudentFeedback = () => {
  const [message, setMessage] = useState(""); // Changed from feedback to message
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      if (!message.trim()) {
        setError("Feedback cannot be empty.");
        return;
      }

      const user = auth.currentUser;
      console.log("Current User:", auth.currentUser);
 // Get logged-in user
      if (!user) {
        setError("User not authenticated.");
        return;
      }

      setLoading(true); // Set loading state

      await addDoc(collection(db, "feedback"), {
        userId: user.uid,
        studentName: user.displayName || "Unknown",
        message: message, // ✅ Store feedback in 'message' field
        createdAt: serverTimestamp(),
      });

      setMessage(""); // Clear input
      toast.success("Feedback submitted successfully!"); // Toast notification
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setError("Failed to submit feedback. Try again.");
    } finally {
      setLoading(false); // Reset loading state
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
          value={message} // Changed to 'message'
          onChange={(e) => setMessage(e.target.value)} // Changed state update
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
