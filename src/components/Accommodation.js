import React from "react";
import "./styles.css";

function Accommodation() {
  return (
    <div className="content-container">
      <h1>🏠 Accommodation Services</h1>
      <p>
        Here are some accommodation options available for students near the college.
      </p>

        <div className="accommodation-item">
          <h2>🏡 Gogreen Boys Hostel</h2>
          <p>
            📞 <strong>Phone:</strong> <a href="tel:09845163837">09845163837</a>
          </p>
          <p>
            📍 <strong>Location:</strong> 
            <a 
              href="https://www.google.com/maps/place/17%C2%B044'14.8%22N+83%C2%B017'49.2%22E/@17.7375098,83.2970378,17.03z/data=!4m4!3m3!8m2!3d17.7374561!4d83.2970104?entry=ttu&g_ep=EgoyMDI1MDIyMy4xIKXMDSoASAFQAw%3D%3D" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View on Map 🌍
            </a>
          </p>
        </div>
    </div>
  );
}

export default Accommodation;
