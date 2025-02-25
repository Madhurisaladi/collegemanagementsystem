// StudentViewNotifications.js
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';

const StudentNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
    const q = selectedType === "All"
      ? query(collection(db, 'notifications'), orderBy('createdAt', 'desc'))
      : query(collection(db, 'notifications'), where('notificationType', '==', selectedType), orderBy('createdAt', 'desc'));

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
  }, [selectedType]);

  const notificationTypes = ["All", "General", "Attendance", "Placement", "Sports", "Result", "Fees", "Time Table", "Holidays"];

  return (
    <div className='container mt-4'>
      <div className='row'>
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
        <div className='col-md-9'>
          <h2 className='text-center mb-4'>Notifications</h2>
          {loading && <p>Loading notifications...</p>}
          {error && <p className='text-danger'>{error}</p>}
          {notifications.length === 0 && !loading && <p>No notifications found.</p>}
          {notifications.map(notification => (
            <div key={notification.id} className='card mb-3'>
              <div className='card-body'>
                <h5 className='card-title'>{notification.title}</h5>
                <p className='card-text'>{notification.message}</p>
                <p className='card-text'>
                  <small className='text-muted'>{notification.department} - Year {notification.year} - Section {notification.section}</small>
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
  );
};

export default StudentNotifications;
