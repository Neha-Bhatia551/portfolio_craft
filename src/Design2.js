import React, { useState, useRef, useEffect } from "react";
import Modal from "./Modal";
import { FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import axios from "axios";

const Design2 = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [portfolioData, setPortfolioData] = useState(null);
  const componentRef = useRef();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleSubmit = async (formData) => {
    try {
      const response = await axios.post(
        "http://ec2-54-91-220-211.compute-1.amazonaws.com:8080/api/userinfo/template/2",
        formData
      );
      setPortfolioData(response.data);
    } catch (error) {
      console.error("There was an error saving the data!", error);
    }
    closeModal();
  };

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get("http://ec2-54-91-220-211.compute-1.amazonaws.com:8080/api/userinfo/template/2");
      setPortfolioData(response.data[0]); // Assuming you only need the first entry for now
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => alert("Portfolio saved as PDF"),
  });

  return (
    <>
      <style>
        {`@media print {
          .no-print {
            display: none;
          }
        }`}
      </style>
      <div style={pageStyle} ref={componentRef}>
        <div style={topBarStyle}>
          {!portfolioData && (
            <button
              onClick={openModal}
              style={buttonStyle}
              className="no-print"
            >
              Enter Details
            </button>
          )}
          {portfolioData && (
            <button
              onClick={handlePrint}
              style={{ ...buttonStyle, backgroundColor: "#555" }}
              className="no-print"
            >
              Save as PDF
            </button>
          )}
        </div>
        <div style={contentStyle}>
          <div style={infoBoxStyle}>
            <div style={initialsStyle}>
              {portfolioData
                ? portfolioData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                : "N"}
            </div>
            <h1 style={{ color: "white", textAlign: "center" }}>
              {portfolioData ? portfolioData.name : "Name"}
            </h1>
            <p style={{ color: "white", textAlign: "center" }}>
              {portfolioData ? portfolioData.role : "Role"} |{" "}
              {portfolioData ? portfolioData.university : "University"}
            </p>
            <div
              style={{ display: "flex", fontSize: "24px", marginTop: "20px" }}
            >
              {portfolioData && portfolioData.email && (
                <a href={`mailto:${portfolioData.email}`} style={iconStyle}>
                  <FaEnvelope />
                </a>
              )}
              {portfolioData && portfolioData.phoneNumber && (
                <a href={`tel:${portfolioData.phoneNumber}`} style={iconStyle}>
                  <FaPhone />
                </a>
              )}
              {portfolioData && portfolioData.linkedIn && (
                <a
                  href={portfolioData.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...iconStyle, color: "#0e76a8" }}
                >
                  <FaLinkedin />
                </a>
              )}
            </div>
          </div>
          <p>{portfolioData ? portfolioData.summary : "Summary"}</p>
          <p>
            Education: {portfolioData ? portfolioData.education : "Education"}
          </p>
          <p>
            Experience:{" "}
            {portfolioData ? portfolioData.experience : "Experience"}
          </p>
          <p>
            Tech Stack: {portfolioData ? portfolioData.techStack : "Tech Stack"}
          </p>
          <p>Projects: {portfolioData ? portfolioData.projects : "Projects"}</p>
        </div>
        {modalOpen && (
          <Modal
            showModal={modalOpen}
            setShowModal={setModalOpen}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </>
  );
};

const topBarStyle = {
  width: "100%",
  padding: "10px 20px",
  display: "flex",
  justifyContent: "flex-end",
  position: "absolute",
  top: 0,
  right: 0,
};

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginLeft: "10px",
};

const pageStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  minWidth: "100vw",
  fontFamily: "Verdana, sans-serif",
  background: "linear-gradient(to right, #ff7e5f, #cb2d3e)", // Sunset orange to dark red gradient
  paddingTop: "60px",
};

const contentStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "10px",
  width: "80%",
  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
  textAlign: "left",
  fontSize: "16px",
  lineHeight: "1.6",
  background: "linear-gradient(to bottom, #26a0da, #314755)", // Teal to deep blue gradient
};

const infoBoxStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  padding: "20px",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const initialsStyle = {
  height: "100px",
  width: "100px",
  backgroundColor: "#666",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "2.5rem",
  marginBottom: "10px",
};

const iconStyle = {
  color: "#fff",
  textDecoration: "none",
  marginRight: "10px",
  display: "flex",
};

export default Design2;
