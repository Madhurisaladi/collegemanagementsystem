import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

const StudentNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Temporary hardcoded student details
  const studentDetails = {
    department: "CSE", // Replace with actual department
    year: "4",        // Replace with actual year
    section: "B",     // Replace with actual section
    semester: "2"     // Replace with actual semester
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const { department, year, section, semester } = studentDetails;
        console.log("Fetching notifications for:", { department, year, section, semester });

        const q = query(
          collection(db, "notifications"),
          where("department", "==", department),
          where("year", "==", year),
          where("section", "==", section),
          where("semester", "==", semester),
          orderBy("timestamp", "desc")
        );

        const querySnapshot = await getDocs(q);
        const fetchedNotifications = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setNotifications(fetchedNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setError("Failed to fetch notifications");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []); // Empty dependency array since we're using hardcoded values

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Notifications</h2>

      {error ? (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      ) : loading ? (
        <p className="text-center">Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <p className="text-center">No notifications available.</p>
      ) : (
        <div className="list-group">
          {notifications.map((notification) => (
            <div key={notification.id} className="list-group-item list-group-item-action shadow-sm mb-3">
              <h5 className="mb-2">{notification.subject}</h5>
              <p>{notification.info}</p>
              
              {notification.fileURL && notification.fileURL.trim() !== "" && (
                <a href={notification.fileURL} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">
                  View Attachment
                </a>
              )}
              
              <p className="text-muted small mt-2">
                {notification.timestamp?.seconds
                  ? new Date(notification.timestamp.seconds * 1000).toLocaleString()
                  : "No timestamp available"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentNotifications;