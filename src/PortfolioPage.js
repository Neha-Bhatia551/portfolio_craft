import React from "react";
import { useLocation } from "react-router-dom";
import { FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";

class PortfolioPageContent extends React.Component {
  render() {
    const { state } = this.props;
    const initials = state.name
      .split(" ")
      .map((n) => n[0])
      .join("");

    return (
      <div style={pageStyle}>
        <div style={infoBoxStyle}>
          <div style={initialsStyle}>{initials}</div>
          <h1
            style={{ marginBottom: "5px", color: "white", textAlign: "center" }}
          >
            {state.name}
          </h1>
          <p
            style={{ marginBottom: "5px", color: "white", textAlign: "center" }}
          >
            {state.role} | {state.university}
          </p>
          <div style={{ display: "flex", fontSize: "24px", marginTop: "20px" }}>
            <a href={`mailto:${state.email}`} style={iconStyle}>
              <FaEnvelope />
            </a>
            <a href={`tel:${state.phoneNumber}`} style={iconStyle}>
              <FaPhone />
            </a>
            {state.linkedIn && (
              <a
                href={state.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...iconStyle, color: "#0e76a8" }}
              >
                <FaLinkedin />
              </a>
            )}
          </div>
        </div>
        <div style={detailsBoxStyle}>
          <h2 style={{ marginBottom: "20px" }}>About Me</h2>
          <p style={{ marginBottom: "10px" }}>{state.summary}</p>
          <p style={{ marginBottom: "10px" }}>Education: {state.education}</p>
          <p style={{ marginBottom: "10px" }}>Experience: {state.experience}</p>
          <p style={{ marginBottom: "10px" }}>Tech Stack: {state.techStack}</p>
          <p style={{ marginBottom: "10px" }}>Projects: {state.projects}</p>
        </div>
      </div>
    );
  }
}

const PortfolioPage = () => {
  const { state } = useLocation();
  const componentRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => alert("Saved as PDF"),
  });

  return (
    <>
      <PortfolioPageContent ref={componentRef} state={state} />
      <button
        onClick={handlePrint}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          padding: "10px 20px", // Increased padding for a larger button
          fontSize: "16px", // Larger font size
          backgroundColor: "#4CAF50", // Green background color
          color: "white", // White text color
          border: "none", // No border
          borderRadius: "5px", // Rounded corners
          cursor: "pointer", // Cursor pointer to indicate clickable
        }}
      >
        Save as PDF
      </button>
    </>
  );
};

const pageStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  minWidth: "100vw",
  fontFamily: "Verdana, sans-serif",
  color: "#000",
  background: "rgba(0, 0, 0, 0.30)",
  padding: "20px",
};

const infoBoxStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  padding: "20px",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginRight: "20px",
};

const detailsBoxStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  padding: "20px",
  borderRadius: "10px",
  width: "50%",
  display: "flex",
  flexDirection: "column",
  color: "white",
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

export default PortfolioPage;
