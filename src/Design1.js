import React, { useState, useRef, useEffect } from "react";
import Modal from "./Modal.js";
import GitHubModal from "./GitHubModal.js"; // Import the new GitHubModal component
import { FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import axios from "axios";

const Design1 = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [gitHubModalOpen, setGitHubModalOpen] = useState(false);
  const [portfolioData, setPortfolioData] = useState(null);
  const [currentPage, setCurrentPage] = useState("About Me"); // State for current page
  const componentRef = useRef();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleSubmit = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/userinfo/template/1",
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
      const response = await axios.get(
        "http://localhost:8080/api/userinfo/template/1"
      );
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

  const generateStaticHtml = (portfolioData) => {
    const experiencesHtml = portfolioData.experiences
      .map((exp) => `<p>${exp}</p>`)
      .join("");
    const projectsHtml = portfolioData.projects
      .map((proj) => `<p>${proj}</p>`)
      .join("");

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Portfolio</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #FFF;
            background: linear-gradient(to right, #6dd5ed, #2193b0);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100vw;
            min-height: 100vh;
            padding-top: 60px;
          }
          .profile {
            text-align: center;
            padding: 20px;
            background-color: #222;
            width: 80%;
            box-shadow: 0 2px 4px rgba(0,0,0,0.5);
            border-radius: 15px;
            margin: 20px auto;
          }
          .content {
            font-size: 16px;
            line-height: 1.6;
            padding: 20px;
            text-align: left;
            width: 80%;
            background-color: #222;
            box-shadow: 0 2px 4px rgba(0,0,0,0.5);
            border-radius: 15px;
            margin: 20px auto;
            background: linear-gradient(to bottom, #ff9a9e, #fecfef);
            position: relative;
          }
          .initials {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            background-color: #444;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 48px;
            color: #FFF;
            margin: 0 auto 20px;
            border: 5px solid white;
          }
          .name {
            font-size: 24px;
          }
          .role {
            font-size: 18px;
            color: #AAA;
          }
          .contact {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            margin-top: 20px;
          }
          .icon {
            display: flex;
            align-items: center;
            color: #FFF;
            text-decoration: none;
            font-size: 16px;
            margin-right: 15px;
          }
          .tabs {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 20px;
            background-color: #cc6699;
            border-radius: 10px;
            padding: 10px;
            position: absolute;
            top: 10px;
            right: 10px;
          }
          .tab {
            padding: 10px 20px;
            cursor: pointer;
            font-size: 18px;
            color: #FFF;
            margin: 0 5px;
            border-bottom: 2px solid transparent;
            transition: color 0.3s, border-bottom 0.3s;
          }
          .tab.active {
            color: #FFD700;
            border-bottom: 2px solid #FFD700;
          }
          .content-section {
            display: none;
          }
          .content-section.active {
            display: block;
          }
        </style>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
        <script>
          function setCurrentPage(page) {
            document.querySelectorAll('.tab').forEach(tab => {
              tab.classList.remove('active');
            });
            document.querySelector('.tab.' + page).classList.add('active');
            document.querySelectorAll('.content-section').forEach(section => {
              section.style.display = 'none';
            });
            document.querySelector('.content-section.' + page).style.display = 'block';
          }
        </script>
      </head>
      <body>
        <div class="profile">
          <div class="initials">
            ${portfolioData.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <h1 class="name">${portfolioData.name}</h1>
          <p class="role">${portfolioData.role} | ${
      portfolioData.university
    }</p>
          <div class="contact">
            ${
              portfolioData.email
                ? `<a href="mailto:${portfolioData.email}" class="icon"><i class="fas fa-envelope"></i></a>`
                : ""
            }
            ${
              portfolioData.phoneNumber
                ? `<a href="tel:${portfolioData.phoneNumber}" class="icon"><i class="fas fa-phone"></i></a>`
                : ""
            }
            ${
              portfolioData.linkedIn
                ? `<a href="${portfolioData.linkedIn}" target="_blank" rel="noopener noreferrer" class="icon"><i class="fab fa-linkedin"></i></a>`
                : ""
            }
          </div>
        </div>
        <div class="content">
          <div class="tabs">
            <div class="tab AboutMe active" onclick="setCurrentPage('AboutMe')">About Me</div>
            <div class="tab Experience" onclick="setCurrentPage('Experience')">Experience</div>
            <div class="tab Projects" onclick="setCurrentPage('Projects')">Projects</div>
          </div>
          <div class="content-section AboutMe active">
            <h2>About Me</h2>
            <p>${portfolioData.summary || ""}</p>
            <p>Education: ${portfolioData.education || ""}</p>
            <p>GPA: ${portfolioData.gpa || ""}</p>
          </div>
          <div class="content-section Experience">
            <h2>Experience</h2>
            ${experiencesHtml}
            <h2>Tech Stack</h2>
            <p>${portfolioData.techStack || ""}</p>
          </div>
          <div class="content-section Projects">
            <h2>Projects</h2>
            ${projectsHtml}
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const uploadToGitHub = async ({ token, username, repository }) => {
    const fileName = "portfolio.html";

    // Generate the HTML content based on portfolioData
    const htmlContent = generateStaticHtml(portfolioData);

    const getFileSha = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${username}/${repository}/contents/${fileName}`,
          {
            headers: {
              Authorization: `token ${token}`,
            },
          }
        );
        return response.data.sha;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          return null; // File not found, so it will be created
        } else {
          console.error("Error fetching file SHA:", error);
          throw error;
        }
      }
    };

    try {
      const sha = await getFileSha();
      const data = {
        message: "Upload portfolio",
        content: btoa(unescape(encodeURIComponent(htmlContent))), // Properly encode HTML content
        sha: sha || undefined, // Only include SHA if it exists
      };

      const response = await axios.put(
        `https://api.github.com/repos/${username}/${repository}/contents/${fileName}`,
        data,
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert("Portfolio uploaded to GitHub successfully!");
      } else {
        alert("Error uploading portfolio to GitHub.");
      }
    } catch (error) {
      console.error("Error uploading portfolio to GitHub:", error);
      if (error.response) {
        console.error("GitHub API response data:", error.response.data);
        alert(
          `Error uploading portfolio to GitHub: ${error.response.data.message}`
        );
      } else {
        alert("Error uploading portfolio to GitHub.");
      }
    }
  };

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
            <div>
              <button
                onClick={handlePrint}
                style={{ ...buttonStyle, backgroundColor: "#555" }}
                className="no-print"
              >
                Save as PDF
              </button>
              <button
                onClick={() => setGitHubModalOpen(true)}
                style={{ ...buttonStyle, backgroundColor: "#007bff" }}
                className="no-print"
              >
                Upload to GitHub
              </button>
            </div>
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
          <div className="tabs" style={tabsStyle}>
            <div
              className={`tab ${currentPage === "About Me" ? "active" : ""}`}
              onClick={() => setCurrentPage("About Me")}
              style={tabStyle}
            >
              About Me
            </div>
            <div
              className={`tab ${currentPage === "Experience" ? "active" : ""}`}
              onClick={() => setCurrentPage("Experience")}
              style={tabStyle}
            >
              Experience
            </div>
            <div
              className={`tab ${currentPage === "Projects" ? "active" : ""}`}
              onClick={() => setCurrentPage("Projects")}
              style={tabStyle}
            >
              Projects
            </div>
          </div>
          {currentPage === "About Me" && (
            <div className="content-section AboutMe active">
              <h2>About Me</h2>
              <p>{portfolioData ? portfolioData.summary : "Summary"}</p>
              <p>
                Education:{" "}
                {portfolioData ? portfolioData.education : "Education"}
              </p>
              <p>GPA: {portfolioData ? portfolioData.gpa : "GPA"}</p>
            </div>
          )}
          {currentPage === "Experience" && (
            <div className="content-section Experience">
              <h2>Experience</h2>
              {portfolioData?.experiences?.map((experience, index) => (
                <p key={index}>{experience}</p>
              ))}
              <h2>Tech Stack</h2>
              <p>{portfolioData ? portfolioData.techStack : "Tech Stack"}</p>
            </div>
          )}
          {currentPage === "Projects" && (
            <div className="content-section Projects">
              <h2>Projects</h2>
              {portfolioData?.projects?.map((project, index) => (
                <p key={index}>{project}</p>
              ))}
            </div>
          )}
        </div>
        {modalOpen && (
          <Modal
            showModal={modalOpen}
            setShowModal={setModalOpen}
            handleSubmit={handleSubmit}
          />
        )}
        <GitHubModal
          showModal={gitHubModalOpen}
          setShowModal={setGitHubModalOpen}
          handleGitHubUpload={uploadToGitHub}
        />
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
  position: "relative",
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

const tabsStyle = {
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: "20px",
  backgroundColor: "#cc6699",
  borderRadius: "10px",
  padding: "10px",
  position: "absolute",
  top: "10px",
  right: "10px",
};

const tabStyle = {
  padding: "10px 20px",
  cursor: "pointer",
  fontSize: "18px",
  color: "#FFF",
  margin: "0 5px",
  borderBottom: "2px solid transparent",
  transition: "color 0.3s, border-bottom 0.3s",
};

export default Design1;
