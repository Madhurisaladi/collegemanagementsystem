import React, { useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const sendNotification = async () => {
    if (!title || !message) {
      alert("Please enter both title and message!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/AdminNotification", {
        title,
        message,
      });

      if (response.data.success) {
        alert("Notification sent successfully!");
        setTitle("");
        setMessage("");
      } else {
        alert("Failed to send notification.");
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("Error sending notification!");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Admin Notification Dashboard</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ margin: "10px", padding: "8px", width: "300px" }}
      />
      <br />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ margin: "10px", padding: "8px", width: "300px", height: "100px" }}
      />
      <br />
      <button onClick={sendNotification} style={{ padding: "10px 20px", cursor: "pointer" }}>
        Send Notification
      </button>
    </div>
  );
};

export default AdminDashboard;
