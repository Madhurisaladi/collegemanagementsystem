import React from "react";
import "animate.css";//for animations
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login"; // Adjust path to your Login component
import Home from "./components/Home"; // Create a Home component for after login
import Register from "./components/register"; //register page
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

