import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function AboutPage() {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/accommodation">Accommodation</Link></li>
          <li><Link to="/food">Food</Link></li>
          <li><a href="https://formbuilder.ccavenue.com/live/the-society-for-collegiate-education" target="_blank" rel="noopener noreferrer">Fees Payment</a></li>
        </ul>
      </nav>

      {/* About Content */}
      <div className="about-container">
        <div className="about-box">
          <h2>Welcome to Student Assistance!</h2>
          <p>Our goal is to provide all students with the resources, guidance, and support they need to succeed during their academic journey at <strong>Dr. Lankapalli Bullayya College of Engineering</strong>. Whether you're seeking academic help or need assistance with accommodation issues, we're here to ensure that your time with us is fulfilling and productive.</p>

          <h3>Our Services:</h3>
          <ol>
            <li><strong>Academic Support:</strong> Access a wide range of resources, including PDFs and study materials, to help you excel in your courses.</li>
            <li><strong>Feedback and Suggestions:</strong> Share your thoughts and feedback on any aspect of your college experience. Your input is vital as we continuously strive to improve the learning environment.</li>
            <li><strong>Event Notifications:</strong> Stay updated on upcoming events, seminars, workshops, and more. Get timely notifications to ensure you never miss an important activity.</li>
            <li><strong>Accommodation and Food Information:</strong> Find details about hostel accommodations, food options, and campus facilities to ensure your comfort during your stay at the college.</li>
            <li><strong>Attendance Tracking:</strong> Keep track of your attendance records and receive regular updates on your attendance status.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
