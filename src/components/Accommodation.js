import React from "react";
import "./styles.css";

function Accommodation() {
  return (
    <div className="accommodation-container">
      <div className="heading-box highlight-box">
        <h1 className="accommodation-heading highlight-text">🏠 <span>Accommodation Services</span></h1>
      </div>
      <p>Find comfortable and affordable accommodations near the college.</p>

      <div className="accommodation-grid">
        <div className="accommodation-column">
          {/* Sri Kasi Anapurna Boys And Girls Hostels */}
          <div className="accommodation-box small-box">
            <h2>🏡 Sri Kasi Anapurna Boys And Girls Hostels</h2>
            <p>📞 <strong>Phone:</strong> <a href="tel:08485940848">08485940848</a></p>
            <p>📍 <strong>Address:</strong> Door No 48-1-6, Rama Talkies Road, Srinagar, Visakhapatnam - 530016 (Beside Reddy Hospital)</p>
            <p>
              🌍 <strong>Location:</strong> 
              <a 
                href="https://jsdl.in/DT-62GKM7Z7HJC"
                target="_blank"
                rel="noopener noreferrer"
              > View on Map 📍</a>
            </p>
          </div>

          {/* Happy Stay PG Boys Hostel */}
          <div className="accommodation-box small-box">
            <h2>🏡 Happy Stay PG Boys Hostel</h2>
            <p>📞 <strong>Phone:</strong> <a href="tel:09606239536">09606239536</a></p>
            <p>📍 <strong>Address:</strong> D.no: 47-10-1/14, 2nd Floor, Bhuvaneshwari Plaza, Airtel Office Building, Diamond Park Road, Dwaraka Nagar, Visakhapatnam - 530016 (Opposite Kotak Mahindra Bank)</p>
            <p>
              🌍 <strong>Location:</strong> 
              <a 
                href="https://jsdl.in/DT-622YKLPNNZ1"
                target="_blank"
                rel="noopener noreferrer"
              > View on Map 📍</a>
            </p>
          </div>

          {/* Dr. Swetha Reddy Ladies Hostel */}
          <div className="accommodation-box small-box">
            <h2>🏡 Dr. Swetha Reddy Ladies Hostel</h2>
            <p>📞 <strong>Phone:</strong> <a href="tel:08105015813">08105015813</a></p>
            <p>📍 <strong>Address:</strong> Door No :- 53-17-44, Reddy Street, Krishna College Road, Maddilapalem, Visakhapatnam - 530013 (Automotive Junction)</p>
            <p>
              🌍 <strong>Location:</strong> 
              <a 
                href="https://jsdl.in/DT-6293PYVHQRS"
                target="_blank"
                rel="noopener noreferrer"
              > View on Map 📍</a>
            </p>
          </div>
        </div>

        <div className="accommodation-column">
          {/* Sri Chakra Boys Hostel */}
          <div className="accommodation-box small-box">
            <h2>🏡 Sri Chakra Boys Hostel</h2>
            <p>📞 <strong>Phone:</strong> <a href="tel:08401776662">08401776662</a></p>
            <p>📍 <strong>Address:</strong> Door No 53-21-4, Chaitanya Nagar, Maddilapalem, Visakhapatnam - 530013 (Beside Gayathri School)</p>
            <p>
              🌍 <strong>Location:</strong> 
              <a 
                href="https://jsdl.in/DT-62MZTQUGBQK"
                target="_blank"
                rel="noopener noreferrer"
              > View on Map 📍</a>
            </p>
          </div>

          {/* Sri Jayaram Paying Guest & Ladies Hostel */}
          <div className="accommodation-box small-box">
            <h2>🏡 Sri Jayaram Paying Guest & Ladies Hostel</h2>
            <p>📞 <strong>Phone:</strong> <a href="tel:08460315421">08460315421</a></p>
            <p>📍 <strong>Address:</strong> Door No : 49-9-1 Sri Mukha Complex 1st Floor, Titan Showroom Building, Dwarakanagar 1st Lane, Dwaraka Nagar Visakhapatnam, Visakhapatnam - 530016 (Near Budil Park Hotel & Near RTC Complex & Opp. ANR Shopping Mall)</p>
            <p>
              🌍 <strong>Location:</strong> 
              <a 
                href="https://jsdl.in/DT-62JWXDGS88B"
                target="_blank"
                rel="noopener noreferrer"
              > View on Map 📍</a>
            </p>
          </div>

          {/* Padmavathi Group Of Hostel And Guest Houses */}
          <div className="accommodation-box small-box">
            <h2>🏡 Padmavathi Group Of Hostel And Guest Houses</h2>
            <p>📞 <strong>Phone:</strong> <a href="tel:07942699253">07942699253</a></p>
            <p>📍 <strong>Address:</strong> Door No 38-40-32, Dwaraka Nagar Visakhapatnam, Visakhapatnam - 530016 (Above Bata Showroom, Beside ICICI Bank)</p>
            <p>
              🌍 <strong>Location:</strong> 
              <a 
                href="https://jsdl.in/DT-62YIEIYYIA6"
                target="_blank"
                rel="noopener noreferrer"
              > View on Map 📍</a>
            </p>
          </div>
        </div>
      </div>
      
      <div className="visit-more-container highlight-box">
        <a 
          href="https://www.justdial.com/Visakhapatnam/Hostels-in-Resapuvanipalem/nct-10253730?trkid=10869-remotecity-fcat&term=Hostels" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="visit-more-link highlight-text">
          🌟 Visit More Hostels 🌟
        </a>
      </div>
    </div>
  );
}

export default Accommodation;
