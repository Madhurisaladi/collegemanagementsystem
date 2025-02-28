import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

function AboutPage() {
  return (
    <div className="about-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <ul>
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/contact" className="nav-link">Contact</Link></li>
          <li>
            <a 
              href="https://formbuilder.ccavenue.com/live/the-society-for-collegiate-education" 
              target="_blank" 
              rel="noopener noreferrer"
              className="nav-link"
            >
              Fees Payment
            </a>
          </li>
        </ul>
      </nav>

      {/* About Content */}
      <div className="about-container">
        <div className="about-card">
          <h1>Welcome to Student Assistance</h1>
          <p className="about-description">
            Our goal is to provide students with the resources, guidance, and support needed to succeed during their academic journey at 
            <strong> Dr. Lankapalli Bullayya College of Engineering</strong>. Whether it's academic support, accommodation assistance, or event updates, we're here to help!
          </p>

          <hr />

          <h3>Our Services</h3>
          <ul className="about-services">
            <li><strong>📚 Academic Support:</strong> Get access to PDFs and study materials to help excel in your courses.</li>
            <li><strong>📝 Feedback & Suggestions:</strong> Share your feedback and help improve the student experience.</li>
            <li><strong>📢 Event Notifications:</strong> Stay informed about upcoming seminars, workshops, and events.</li>
            <li><strong>🏠 Accommodation & Food:</strong> Find details about hostel facilities and food options.</li>
            <li><strong>✅ Attendance Tracking:</strong> Monitor your attendance records with ease.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
