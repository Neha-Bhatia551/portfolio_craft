import React, { useState } from "react";
import Modal from "./Modal";
const Design1 = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div style={pageStyle}>
      <div style={profileStyle}>
        <div style={initialsStyle}>RV</div>
        <h1 style={nameStyle}>NAME</h1>
        <p style={roleStyle}>ROLE | University</p>
      </div>
      <div style={contentStyle}>
        <h2>About Me</h2>
        <p>
          I am a Software Engineer currently pursuing a Master's degree in
          Computer Science...
        </p>
        <button onClick={openModal} style={buttonStyle}>
          Enter Details
        </button>
      </div>
      {modalOpen && <Modal closeModal={closeModal} />}
    </div>
  );
};

const pageStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100vw",
  minHeight: "100vh",
  backgroundColor: "#000",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  color: "#FFF",
};

const profileStyle = {
  textAlign: "center",
  padding: "20px",
  backgroundColor: "#222",
  width: "80%",
  boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
  borderRadius: "15px",
  margin: "20px auto", // Ensure it has similar vertical margin as contentStyle
};

const contentStyle = {
  fontSize: "16px",
  lineHeight: "1.6",
  padding: "20px", // Same padding as profileStyle
  textAlign: "left",
  width: "80%", // Same width as profileStyle
  backgroundColor: "#222",
  boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
  borderRadius: "15px",
  margin: "20px auto", // Consistent margin with profileStyle
};

const initialsStyle = {
  width: "150px",
  height: "150px",
  borderRadius: "50%",
  backgroundColor: "#444",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "48px",
  color: "#FFF",
  margin: "0 auto 20px",
  border: "5px solid white",
};

const nameStyle = {
  fontSize: "24px",
};

const roleStyle = {
  fontSize: "18px",
  color: "#AAA",
};

const buttonStyle = {
  marginTop: "20px",
  padding: "10px 20px",
  fontSize: "16px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Design1;
