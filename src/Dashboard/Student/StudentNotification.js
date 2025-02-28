import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db, auth } from '../../firebase';
import { collection, query, orderBy, onSnapshot, where, doc, getDoc } from 'firebase/firestore';
import './StudentNotification.css';

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

  const notificationTypes = ["All", "General", "Attendance", "Placement", "Sports", "Result", "Fees", "Time Table", "Holidays"];

  return (
    <div className="dashboard-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <ul>
          <li><Link to="/student-dashboard">Home</Link></li>
          
          <li><Link to="/student-feedback">Give Feedback</Link></li>
          <li><Link to="/student-profile">Profile</Link></li>
          <li><Link to="/student-documents">Documents</Link></li>
        </ul>
      </nav>
      
      {/* Main Content */}
      <div className='container mt-4'>
        <div className='row'>
          {/* Sidebar Filter */}
          <div className='col-md-3'>
            <div className='list-group'>
              {notificationTypes.map(type => (
                <button
                  key={type}
                  className={`list-group-item list-group-item-action ${selectedType === type ? 'active' : ''}`}
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications Section */}
          <div className='col-md-9'>
            <div className='notification-header'>
              <h2> Notifications</h2>
            </div>

            {loading && <p>Loading notifications...</p>}
            {error && <p className='text-danger'>{error}</p>}
            {notifications.length === 0 && !loading && <p>No notifications found.</p>}

            {notifications.map(notification => (
              <div key={notification.id} className='card notification-card'>
                <div className='card-body'>
                  <div className='notification-title-box'>
                    <h5 className='card-title'>{notification.title}</h5>
                  </div>
                  <p className='card-text'>{notification.message}</p>
                  <p className='card-text'>
                    <small className='text-muted'>
                      {notification.department} - Year {notification.year} - Section {notification.section}
                    </small>
                  </p>
                  {notification.fileURL && (
                    <a href={notification.fileURL} target='_blank' rel='noopener noreferrer' className='btn btn-primary'>
                      View Attachment
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentNotifications;
