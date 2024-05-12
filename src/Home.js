import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Ensure react-icons is installed

const Home = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end", // Ensures content is aligned to the far right
          padding: "10px 20px",
          backgroundColor: "transparent", // Navbar background remains transparent
          width: "90%", // Ensures the div stretches across the full width
          position: "fixed", // Fixes the navbar at the top of the page
          top: 0, // Aligns the navbar at the top edge of the viewport
          left: 0, // Aligns the navbar at the left edge of the viewport
          right: 0, // Aligns the navbar at the right edge of the viewport
          zIndex: 1000, // Ensures the navbar stays on top of other content
        }}
      >
        <Link
          to="/login"
          style={{
            fontSize: "16px",
            color: "#fff", // Text color remains white for visibility
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <FaUserCircle
            style={{ marginRight: "5px", color: "#fff" }}
            size={24}
          />
          Login
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "90vh",
          paddingTop: "60px", // Adds padding at the top to account for the fixed navbar
        }}
      >
        <p style={{ fontSize: "50px", color: "white" }}>
          WELCOME TO PORTFOLIO CRAFT
        </p>
        <p>Explore innovative designs and creative artworks!</p>
      </div>
    </div>
  );
};

export default Home;
