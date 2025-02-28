import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function Food() {
  const foodSupplies = [
    {
      title: "SENORiTA Restaurant & Cafe",
      phone: "7660973221",
      location: "9-17-4, Amar Nagar, C.B.M. Compound, Asilmetta, Rama Talkies Rd, Junction, Visakhapatnam, Andhra Pradesh 530016",
      mapLink: "https://www.google.com/maps?s=web&sca_esv=3a00b5f4c73ad6fb&lqi=CiZyZXN0YXVyYW50cyBhbmQgbWVhbHMgbmVhciByYW1hdGFsa2llc0im17mEtLmAgAhaPhAAEAEQAhgAGAIYBCImcmVzdGF1cmFudHMgYW5kIG1lYWxzIG5lYXIgcmFtYXRhbGtpZXMqCAgDEAAQARACkgESY2hpbmVzZV9yZXN0YXVyYW50qgFqEAEqGSIVcmVzdGF1cmFudHMgYW5kIG1lYWxzKAAyHxABIhubGcHTQEH2GhnuVr9QkYp4-WVi-anPvgY_6n4yKhACIiZyZXN0YXVyYW50cyBhbmQgbWVhbHMgbmVhciByYW1hdGFsa2llcw&phdesc=gJTJtsI2VVQ&vet=12ahUKEwiQtbL2neWLAxXjSWwGHVddCpQQ1YkKegQIHhAB..i&cs=0&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KZdEioTwQzk6Mae2lA4nK-14&daddr=9-17-4,+Amar+Nagar,+C.B.M.+Compound,+Asilmetta,+Rama+Talkies+Rd,+junction,+Visakhapatnam,+Andhra+Pradesh+530016"
    },
    {
      title: "Planet 9 Restaurant",
      phone: "N/A",
      location: "Ground floor, Sri Rama Sai Gayatri arcade, Rama Talkies Rd, beside Axis bank, Ramatalkies Area, Dwaraka Nagar, Visakhapatnam, Andhra Pradesh 530016",
      mapLink: "https://www.google.com/maps/dir//Ground+floor,+Sri+Rama+Sai+Gayatri+arcade,+Rama+Talkies+Rd,+beside+Axis+bank,+Ramatalkies+Area,+Dwaraka+Nagar,+Visakhapatnam,+Andhra+Pradesh+530016/@17.7283596,83.2291071,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3a3943fff0fb9451:0xbe5f12f19ce4ebff!2m2!1d83.3115089!2d17.7283768?entry=ttu"
    },
    {
      title: "Seasonal Food Corner",
      phone: "N/A",
      location: "Near Opp. Repose Sleep Station, Hotchips Up Stair, Rama Talkies Rd, beside Hot chips, Visakhapatnam, Andhra Pradesh 530016",
      mapLink: "https://www.google.com/maps/dir//near+Opp.+Repose+Sleep+Station,+Hotchips+Up+Stair,+Rama+Talkies+Rd,+beside+Hot+chips,+Visakhapatnam,+Andhra+Pradesh+530016/@17.7268838,83.2280801,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3a3943e73f5d132d:0x8501652392ffcd8c!2m2!1d83.3104639!2d17.7269171?entry=ttu"
    },
    {
      title: "Surya's Hello Vizag Restaurant",
      phone: "N/A",
      location: "Rama Talkies Rd, Ramatalkies Area, Dwaraka Nagar, Visakhapatnam, Andhra Pradesh 530016",
      mapLink: "https://www.google.com/maps/dir//Rama+Talkies+Rd,+Ramatalkies+Area,+Dwaraka+Nagar,+Visakhapatnam,+Andhra+Pradesh+530016/@17.7294913,83.2297179,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3a39436f621c71f5:0x51fc8e446dfe13d9!2m2!1d83.3121197!2d17.7295085?entry=ttu"
    }
  ];

  return (
    <div>
      <nav className="navbar">
        <ul className="nav-list">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/contact" className="nav-link">Contact</Link></li>
        </ul>
      </nav>
      <div style={{ height: "30px" }}></div>
      <div className="food-container">
        <h1 className="food-heading">🍽️ Nearby Food Supplies</h1>
        <div className="food-grid">
          {foodSupplies.map((supply, index) => (
            <div key={index} className="food-box">
              <h2>{supply.title}</h2>
              <p>
                📞 <strong>Phone:</strong> {supply.phone}
              </p>
              <p>
                📍 <strong>Location:</strong> {supply.location}
              </p>
              <p>
                🌍 <strong>Map:</strong> <a href={supply.mapLink} target="_blank" rel="noopener noreferrer">View on Map 📍</a>
              </p>
            </div>
          ))}
        </div>
        <div className="more-places">
          <a href="https://www.google.com/search?sca_esv=3a00b5f4c73ad6fb&tbm=lcl&sxsrf=AHTn8zoYMBhpy-f74dUiVvgGR7GSpZ0MRQ:1740707125002&q=restaurants+and+meals+near+ramatalkies&rflfq=1&num=10&sa=X&ved=2ahUKEwjt3N-un-WLAxWgUWwGHfitJe8QjGp6BAgiEAE&biw=1536&bih=695&dpr=1.25#rlfi=hd:;si:;mv:[[17.759636099999998,83.3424558],[17.7108634,83.2463783]]" target="_blank" rel="noopener noreferrer" className="more-places-btn">More Places ➡️</a>
        </div>
      </div>
    </div>
  );
}

export default Food;
