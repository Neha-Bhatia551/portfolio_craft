import React, { useState, useRef, useEffect } from "react";
import Modal from "./Modal";
import { FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import axios from "axios";

const Design1 = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [portfolioData, setPortfolioData] = useState(null);
  const componentRef = useRef();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleSubmit = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/userinfo",
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
      const response = await axios.get("http://localhost:8080/api/userinfo");
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
        <div style={profileStyle}>
          <div style={initialsStyle}>
            {portfolioData
              ? portfolioData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
              : "N"}
          </div>
          <h1 style={nameStyle}>
            {portfolioData ? portfolioData.name : "NAME"}
          </h1>
          <p style={roleStyle}>
            {portfolioData
              ? `${portfolioData.role} | ${portfolioData.university}`
              : "ROLE | University"}
          </p>
          {portfolioData && (
            <div style={contactStyle}>
              {portfolioData.email && (
                <a href={`mailto:${portfolioData.email}`} style={iconStyle}>
                  <FaEnvelope />
                </a>
              )}
              {portfolioData.phoneNumber && (
                <a href={`tel:${portfolioData.phoneNumber}`} style={iconStyle}>
                  <FaPhone />
                </a>
              )}
              {portfolioData.linkedIn && (
                <a
                  href={portfolioData.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={iconStyle}
                >
                  <FaLinkedin />
                </a>
              )}
            </div>
          )}
        </div>
        <div style={contentStyle}>
          <h2>About Me</h2>
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
  width: "100vw",
  minHeight: "100vh",
  paddingTop: "60px",
  backgroundColor: "#000",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  color: "#FFF",
  background: "linear-gradient(to right, #6dd5ed, #2193b0)",
};

const profileStyle = {
  textAlign: "center",
  padding: "20px",
  backgroundColor: "#222",
  width: "80%",
  boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
  borderRadius: "15px",
  margin: "20px auto",
};

const contentStyle = {
  fontSize: "16px",
  lineHeight: "1.6",
  padding: "20px",
  textAlign: "left",
  width: "80%",
  backgroundColor: "#222",
  boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
  borderRadius: "15px",
  margin: "20px auto",
  background: "linear-gradient(to bottom, #ff9a9e, #fecfef)",
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

const contactStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "20px",
};

const iconStyle = {
  display: "flex",
  alignItems: "center",
  color: "#FFF",
  textDecoration: "none",
  fontSize: "16px",
  marginRight: "15px",
};

export default Design1;
