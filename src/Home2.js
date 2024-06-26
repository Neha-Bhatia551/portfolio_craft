import React from "react";
import { useNavigate } from "react-router-dom";
import template1 from "./images/TEMPLATE 1.png";
import template2 from "./images/TEMPLATE 2.png";
import template3 from "./images/TEMPLATE 3.png";

const Home2 = () => {
  const navigate = useNavigate();

  const logout = () => {
    navigate("/login");
  };

  const navigateToDesign = (path) => {
    navigate(path);
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
            color: "white",
            animation: "fadeIn 1.5s ease-out",
          }}
        >
          Welcome to Portfolio Craft 2.0
        </h1>
        {/* Image placeholders for designs */}
        <div style={{ display: "flex", marginTop: "20px" }}>
          <img
            src={template1}
            alt="Design 1"
            style={{
              width: "300px",
              height: "300px",
              margin: "10px",
              cursor: "pointer",
            }}
            onClick={() => navigateToDesign("/design1")}
          />
          <img
            src={template2}
            alt="Design 2"
            style={{
              width: "300px",
              height: "300px",
              margin: "10px",
              cursor: "pointer",
            }}
            onClick={() => navigateToDesign("/design2")}
          />
          <img
            src={template3}
            alt="Design 3"
            style={{
              width: "300px",
              height: "300px",
              margin: "10px",
              cursor: "pointer",
            }}
            onClick={() => navigateToDesign("/design3")}
          />
        </div>
      </div>
    </>
  );
};

export default Home2;
