import React, { useEffect, useState } from 'react'; // Correct import of React and hooks
import './styles.css';
import { Link } from 'react-router-dom'; // Import Link for navigation

function HomePage() {
  const [slideIndex, setSlideIndex] = useState(0); // State for current slide index

  // Array of slide images
  const slideImages = [
    "https://images.hindustantimes.com/rf/image_size_640x362/HT/p2/2016/08/04/Pictures/hindu-debate_77ddff76-5a1a-11e6-8ec9-11a86e94b7e9.jpg",
    "https://www.aesahd.edu.in/img/institutions/colleges/agteachers/agteachers-2.jpg",
    "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2016/05/college-1462989841.jpg",
    "https://english.varthabharati.in/storage/uploads/india/Exam_students_PTI-compressed_vb_52.jpeg"
  ];

  useEffect(() => {
    // Function to change slides every 5 seconds
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slideImages.length); // Loop through images
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [slideImages.length]);

  return (
    <div>
      {/* Header with Logo and Auth Links */}
      <header className="header">
        <div className="logo">
          <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjXo8SHwPF1dQm5-RusN6pSD-8yfqrkXgAONzgCzeYKV5HtYN9z5kAgu5oel2q39t74Tb2sEf-qI-J2v8mVZ-a5trGEoY-LJaP11XgHK05k8DpbDKqfxHwltDs7lnx_YN0aP87bLeccDw/s1600/z31.png" alt="DLBCE EduBridge Logo" />
        </div>
        <div className="auth-links">
          <Link to="/login" className="auth-button">Login</Link>
          <a href="https://lbce.edu.in/" target="_blank" rel="noopener noreferrer" className="auth-button">About Us</a>
        </div>
      </header>

      {/* Image Slideshow Section */}
      <section className="slideshow">
        <div className="slide-container">
          {/* Render the slides dynamically based on the slideIndex */}
          <div className="slide">
            <img src={slideImages[slideIndex]} alt={`College Image ${slideIndex + 1}`} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2025 DLBCE EduBridge. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
