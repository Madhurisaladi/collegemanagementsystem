import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      {/* Banner Area */}
      <div className="banner-area">
        <div className="wrapper">
          <div className="navigation">
            <h1 className="logo">
              {/* No logo here anymore */}
            </h1>
            <nav>
              {/* Change Login link to Home and navigate to https://bullayyacollege.org/ */}
              <a href="https://bullayyacollege.org/" target="_blank" rel="noopener noreferrer">Home</a>
            </nav>
          </div>

          {/* Text area below the logo */}
          <div className="banner-text">
            <div className="text-area">
              {/* New Image inside the <h2> */}
              <h2>
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/5/54/Bullayya_College_logo.png"
                  alt="New College Logo"
                  className="college-logo"
                />
              </h2>
              <h3>DLBC EduBridge</h3>
              <h4>Where Knowledge Meets Excellence</h4>
              <p>"A Place Where Curiosity is Sparked, Ideas Flourish, and Dreams Take Shape." </p>
              {/* Replaced "Contact Me" with "Login" */}
              <Link to="/login" className="login-button">Login</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <p>&copy; 2025 DLBCE EduBridge. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
