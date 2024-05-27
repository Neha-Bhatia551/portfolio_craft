import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm.js";
import Home from "./Home.js";
import Home2 from "./Home2.js";
import "./App.css";
import backgroundImage from "./images/Portfolio.jpeg";
import Design1 from "./Design1.js";
import Design2 from "./Design2.js";
import Design3 from "./Design3.js";


function App() {
  return (
    <Router>
      <div
        style={{
          minHeight: "100vh", // Ensure it covers at least the full viewport height
          width: "100vw", // Ensure it covers the full viewport width
          display: "flex", // Use flexbox to center the content
          flexDirection: "column", // Stack children vertically
          justifyContent: "center", // Center vertically
          alignItems: "center", // Center horizontally
          background: `url(${backgroundImage}) no-repeat center center fixed`,
          backgroundSize: "cover", // Cover the entire viewport
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/home2" element={<Home2 />} />
          <Route path="/design1" element={<Design1 />} />
          <Route path="/design2" element={<Design2 />} />
          <Route path="/design3" element={<Design3 />} />
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
