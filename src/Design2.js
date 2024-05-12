// Design2.js
import React, { useState } from "react";
import Modal from "./Modal";

const Design2 = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Design 2: Compact Summary</h1>
      <p>
        Here you can explore a compact layout of your summary along with an
        integrated tech stack.
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
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  borderRadius: "5px",
};

export default Design2;
