import React from "react";
import { Link } from "react-router-dom";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/accommodation">Accommodation</Link></li>
          <li><Link to="/food">Food</Link></li>
          <li>
            <a 
              href="https://formbuilder.ccavenue.com/live/the-society-for-collegiate-education" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Fees Payment
            </a>
          </li>
        </ul>
      </nav>

      {/* Contact Information */}
      <div className="contact-card">
        <h1>Contact Us</h1>
        <hr />
        <div className="contact-info">
          <p><strong>Dr. Lankapalli Bullayya Colleges</strong></p>
          <p>Survey No:44, New Resapuvanipalem,</p>
          <p>Visakhapatnam-530013, Andhra Pradesh, India.</p>
          <hr />
          <p><strong>Email:</strong> <a href="mailto:info@bullayyacollege.org">info@bullayyacollege.org</a></p>
          <p><strong>Phone:</strong> 0891-2701818</p>
          <p><strong>Fax:</strong> 0891-2714423</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
