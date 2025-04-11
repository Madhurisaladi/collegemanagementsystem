import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db, auth } from '../../firebase';
import { collection, query, orderBy, onSnapshot, where, doc, getDoc } from 'firebase/firestore';
import "./StudentNotification.css";

const StudentNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [studentDetails, setStudentDetails] = useState({
    department: "",
    year: "",
    section: ""
  });

  const notificationTypes = ["All", "General", "Attendance", "Placement", "Sports", "Result", "Fees", "Time Table", "Holidays"];

  const handleFilterChange = (e) => {
    setSelectedType(e.target.value);
  };

  useEffect(() => {
    const fetchStudentDetails = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            setStudentDetails({
              department: data.department || "",
              year: data.year || "",
              section: data.section || ""
            });
          } else {
            console.error("User document does not exist");
          }
        } catch (error) {
          console.error("Error fetching student details:", error);
          setError("Failed to load student details.");
        }
      }
    };

    fetchStudentDetails();
  }, []);

  useEffect(() => {
    if (!studentDetails.department || !studentDetails.year || !studentDetails.section) {
      setLoading(false);
      return;
    }

    const q = selectedType === "All"
      ? query(
          collection(db, 'notifications'),
          where('department', '==', studentDetails.department),
          where('year', '==', studentDetails.year),
          where('section', '==', studentDetails.section),
          orderBy('createdAt', 'desc')
        )
      : query(
          collection(db, 'notifications'),
          where('notificationType', '==', selectedType),
          where('department', '==', studentDetails.department),
          where('year', '==', studentDetails.year),
          where('section', '==', studentDetails.section),
          orderBy('createdAt', 'desc')
        );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotifications(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching notifications:", error);
      setError("Failed to load notifications.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, [selectedType, studentDetails]);

  return (
    <div className="notifications-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <ul>
          <li><Link to="/student-dashboard">Home</Link></li>
          <li><Link to="/student-documents">Documents</Link></li>
          <li><Link to="/" className="nav-logout">Logout</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="notifications-container">
        {/* Desktop Filter Sidebar */}
        <div className="filter-sidebar">
          <h3 className="filter-title">Filter Notifications</h3>
          <div className="filter-options">
            {notificationTypes.map(type => (
              <button
                key={type}
                className={`filter-option ${selectedType === type ? 'active' : ''}`}
                onClick={() => setSelectedType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Filter Dropdown */}
        <div className="mobile-filter">
          <select 
            className="filter-select"
            value={selectedType}
            onChange={handleFilterChange}
          >
            {notificationTypes.map(type => (
              <option key={type} value={type}>
                {type === "All" ? "All Notifications" : type}
              </option>
            ))}
          </select>
        </div>

        {/* Notifications List */}
        <div className="notifications-list">
          <h2 className="section-title">Notifications</h2>
          
          {loading && <p className="loading-message">Loading notifications...</p>}
          {error && <p className="error-message">{error}</p>}
          
          {!loading && notifications.length === 0 && (
            <div className="no-notifications">
              <p>No notifications found.</p>
            </div>
          )}

          {notifications.map(notification => (
            <div key={notification.id} className="notification-card">
              <h3 className="notification-title">{notification.title}</h3>
              <p className="notification-message">{notification.message}</p>
              <div className="notification-meta">
                <span>{notification.department}</span>
                <span>Year {notification.year}</span>
                <span>Section {notification.section}</span>
              </div>
              {notification.fileURL && (
                <a 
                  href={notification.fileURL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="view-attachment"
                >
                  View Attachment
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentNotifications;
