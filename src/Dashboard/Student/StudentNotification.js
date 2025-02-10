import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentDashboard = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("http://localhost:5000/StudentNotifications");
      setNotifications(response.data.notifications || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      alert("Failed to fetch notifications!");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Student Dashboard</h2>
      <h3>Notifications</h3>
      {notifications.length === 0 ? (
        <p>No notifications available</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {notifications.map((notification, index) => (
            <li
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                margin: "10px",
                borderRadius: "5px",
              }}
            >
              <strong>{notification.title}</strong>
              <p>{notification.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentDashboard;
