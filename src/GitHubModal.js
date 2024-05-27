import React, { useState } from "react";

const GitHubModal = ({ showModal, setShowModal, handleGitHubUpload }) => {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [repository, setRepository] = useState("");

  const handleSubmit = () => {
    handleGitHubUpload({ token, username, repository });
    setShowModal(false);
  };

  return (
    showModal && (
      <div style={modalStyle}>
        <div style={modalContentStyle}>
          <h2>Enter your GitHub Details</h2>
          <label style={labelStyle}>
            GitHub Token:
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              style={inputStyle}
            />
          </label>
          <label style={labelStyle}>
            GitHub Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
            />
          </label>
          <label style={labelStyle}>
            Repository Name:
            <input
              type="text"
              value={repository}
              onChange={(e) => setRepository(e.target.value)}
              style={inputStyle}
            />
          </label>
          <button onClick={handleSubmit} style={buttonStyle}>
            Upload
          </button>
          <button onClick={() => setShowModal(false)} style={buttonStyle}>
            Cancel
          </button>
        </div>
      </div>
    )
  );
};

const modalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalContentStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "5px",
  width: "300px",
  display: "flex",
  flexDirection: "column",
  color: "black", // Set text color to black
  boxSizing: "border-box",
};

const labelStyle = {
  display: "flex",
  flexDirection: "column",
  marginBottom: "10px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  margin: "10px 0",
  width: "100%",
};

export default GitHubModal;
