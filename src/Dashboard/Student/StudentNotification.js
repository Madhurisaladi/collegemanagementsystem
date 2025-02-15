import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

const StudentNotifications = ({ department, year, section, semester }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!department || !year || !section || !semester) {
      console.error("Missing student profile data!", { department, year, section, semester });
      setLoading(false);
      return;
    }

    const fetchNotifications = async () => {
      setLoading(true);
      try {
        console.log("Fetching notifications for:", { department, year, section, semester });

        const q = query(
          collection(db, "notifications"),
          where("department", "==", department),
          where("year", "==", year),
          where("section", "==", section),
          where("semester", "==", semester), // Add semester filter
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
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [department, year, section, semester]); // Add semester to dependency array

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Notifications</h2>

      {loading ? (
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