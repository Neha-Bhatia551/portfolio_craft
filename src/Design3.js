// Design3.js
import React, { useState } from "react";
import Modal from "./Modal";

const Design3 = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Design 3: Creative Projects Display</h1>
      <p>
        This layout focuses on showcasing your creative projects with detailed
        descriptions of your experience.
      </p>
      <button onClick={openModal} style={buttonStyle}>
        Enter Details
      </button>
      {modalOpen && <Modal closeModal={closeModal} />}
    </div>
  );
};

const buttonStyle = {
  padding: "10px 20px",
  margin: "10px",
  fontSize: "16px",
  cursor: "pointer",
  backgroundColor: "#28A745",
  color: "white",
  border: "none",
  borderRadius: "5px",
};

export default Design3;
