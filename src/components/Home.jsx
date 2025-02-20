import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';

function HomePage() {
  const navigate = useNavigate();

  const handleNavigation = (query) => {
    window.location.href = `https://www.google.com/search?q=${query}`;
  };

  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li>
            <button 
              onClick={() => handleNavigation('nearby+pg+hostels+near+Dr.+Lankapalli+Bullayya+College+Vizag')} 
              className="nav-link"
            >
              Accommodation
            </button>
          </li>
          <li>
            <span 
              onClick={() => handleNavigation('nearby+restaurants+near+Dr.+Lankapalli+Bullayya+College+Vizag')} 
              className="nav-link"
            >
              Food
            </span>
          </li>
          <li>
            <a 
              href="https://formbuilder.ccavenue.com/live/the-society-for-collegiate-education" 
              rel="noopener noreferrer"
            >
              Fees Payment
            </a>
          </li>
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
          <a 
            href="https://bullayyacollege.org/" 
            rel="noopener noreferrer" 
            className="btn btn-learn"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
