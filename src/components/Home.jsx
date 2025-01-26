import React, { useEffect, useState } from "react"; // Correct import of React and hooks
import "./styles.css"; // Import CSS for styling
import { Link } from "react-router-dom"; // Import Link for navigation

function HomePage() {
  const [slideIndex, setSlideIndex] = useState(0); // State for current slide index

  // Array of slide images
  const slideImages = [
    "https://images.hindustantimes.com/rf/image_size_640x362/HT/p2/2016/08/04/Pictures/hindu-debate_77ddff76-5a1a-11e6-8ec9-11a86e94b7e9.jpg",
    "https://www.aesahd.edu.in/img/institutions/colleges/agteachers/agteachers-2.jpg",
    "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2016/05/college-1462989841.jpg",
    "https://english.varthabharati.in/storage/uploads/india/Exam_students_PTI-compressed_vb_52.jpeg",
  ];

  useEffect(() => {
    // Function to change slides every 4 seconds
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slideImages.length); // Loop through images
    }, 4000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [slideImages.length]);

  return (
    <div>
      {/* Header Section */}
      <header className="header">
        <div className="logo">
          <img
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjXo8SHwPF1dQm5-RusN6pSD-8yfqrkXgAONzgCzeYKV5HtYN9z5kAgu5oel2q39t74Tb2sEf-qI-J2v8mVZ-a5trGEoY-LJaP11XgHK05k8DpbDKqfxHwltDs7lnx_YN0aP87bLeccDw/s1600/z31.png"
            alt="DLBCE EduBridge Logo"
            className="logo-image"
          />
        </div>
        <div className="auth-links">
          <Link to="/login" className="auth-button">
            Login
          </Link>
          <a
            href="https://lbce.edu.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="auth-button"
          >
            About Us
          </a>
        </div>
      </header>

      {/* Page Title */}
      <h1 className="page-title">DLBCE EduBridge</h1>

      {/* Slideshow Section */}
      <section className="slideshow">
        <div className="slide-container">
          <div className="slide">
            <img
              src={slideImages[slideIndex]}
              alt={`Slide ${slideIndex + 1}`}
              className="slide-image"
            />
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          {/* Address Section */}
          <div className="footer-section address">
            <h2>Contact Us</h2>
            <p><strong>Address:</strong> Dr. Lankapalli Bullayya College of Engineering, Visakhapatnam, Andhra Pradesh, India</p>
            <p><strong>Phone:</strong> +91-1234567890</p>
            <p><strong>Email:</strong> info@lbce.edu.in</p>
          </div>

          {/* Map Section */}
          <div className="footer-section map">
            <h2>Our Location</h2>
            
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.2715377160416!2d83.3143637!3d17.7318403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3943ecfdf01e87%3A0x79f4b10b1d3eca03!2sDr.%20Lankapalli%20Bullayya%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1737883568301!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: "0", borderRadius: "8px" }}
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <div className="footer-bottom">
          &copy; 2025 DLBCE EduBridge. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
