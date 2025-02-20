import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function HomePage() {
  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/accommodation">Accommodation</Link></li>
          <li><Link to="/food">Food</Link></li>
          <li><Link to="/contact">Contact</Link></li>

          <li><a href="https://formbuilder.ccavenue.com/live/the-society-for-collegiate-education" target="_blank" rel="noopener noreferrer">Fees Payment</a></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="content">
        <div className="logo">
          <img src="https://upload.wikimedia.org/wikipedia/en/5/54/Bullayya_College_logo.png" alt="Bullayya College Logo" />
        </div>

        <h1>Welcome to DLBC</h1>
        <p className="black-text">Join us at Dr. Lankapalli Bullayya College of Engineering to gain the skills and knowledge that shape future leaders and problem-solvers.</p>

        <div className="buttons">
          <Link to="/login" className="btn btn-login">Login</Link>
          <Link to="https://bullayyacollege.org/" className="btn btn-learn">Learn More</Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
