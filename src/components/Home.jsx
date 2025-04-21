import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function HomePage() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <ul className="nav-list">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/about" className="nav-link">About</Link></li>
          <li 
            className="student-support dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            {/* <Link to="/student-support" className="nav-link">Student Support</Link> */}
            Student Support
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li><Link to="/accommodation" className="dropdown-item small-item light-bg">🏠 Accommodation</Link></li>
                <li><Link to="/food" className="dropdown-item small-item light-bg">🍽️ Food</Link></li>
              </ul>
            )}
          </li>
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
          <li><Link to="/contact" className="nav-link">Contact</Link></li>
        </ul>
      </nav>

      {/* Centered Box */}
      <div className="content-container">
  <div className="logo">
    <img src="https://upload.wikimedia.org/wikipedia/en/5/54/Bullayya_College_logo.png" alt="Bullayya College Logo" />
  </div>

  <h1>Welcome to DLBC</h1>
  <p className="black-text">
    Join us at Dr. Lankapalli Bullayya College of Engineering to gain 
    the skills and knowledge that shape future leaders and problem-solvers.
  </p>

  <div className="buttons">
    <Link to="/login" className="btn btn-login">Login</Link>
    <a href="https://bullayyacollege.org/" rel="noopener noreferrer" className="btn btn-learn">
      Learn More
    </a>
  </div>
</div>

    </div>
  );
}

export default HomePage;
