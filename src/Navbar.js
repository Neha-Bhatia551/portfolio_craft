import React from "react";
import { FaUserCircle } from "react-icons/fa"; // Using react-icons for user icon

const Navbar = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: "10px 20px",
        backgroundColor: "#f8f9fa", // Light gray background
        borderBottom: "1px solid #ccc",
      }}
    >
      <button
        style={{
          fontSize: "16px",
          color: "#333",
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
        }}
      >
        <FaUserCircle style={{ marginRight: "5px" }} size={24} /> Login
      </button>
    </div>
  );
};

export default Navbar;
