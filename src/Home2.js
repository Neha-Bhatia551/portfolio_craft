import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal"; // Ensure the Modal component is imported

const Home2 = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const logout = () => {
    navigate("/login");
  };

  const handleSubmit = (data) => {
    navigate("/portfolio", { state: { ...data } });
    setShowModal(false);
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <div style={{ position: "absolute", top: 10, right: 20 }}>
          <button
            onClick={logout}
            style={{
              padding: "8px 16px",
              fontSize: "16px",
              cursor: "pointer",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Logout
          </button>
        </div>
        <h1
          style={{
            fontSize: "32px",
            marginBottom: "20px",
            color: "white", // Make text color white
            animation: "fadeIn 1.5s ease-out", // Apply fade-in animation
          }}
        >
          Welcome to Portfolio Craft 2.0
        </h1>
        <button
          onClick={() => setShowModal(true)}
          style={{
            padding: "10px 20px",
            fontSize: "18px",
            cursor: "pointer",
            background: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Create Portfolio
        </button>
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default Home2;
