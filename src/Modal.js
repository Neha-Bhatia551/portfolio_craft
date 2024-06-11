import React, { useState } from "react";

const ModalStep1 = ({ formData, handleChange, nextStep, closeModal }) => (
  <div style={modalStyle}>
    <div style={modalContentStyle}>
      <h2 style={{ color: "#228B22" }}>Basic Info</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="text"
        name="role"
        placeholder="Role"
        value={formData.role}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="text"
        name="university"
        placeholder="University"
        value={formData.university}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="text"
        name="education"
        placeholder="Education"
        value={formData.education}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="text"
        name="gpa"
        placeholder="GPA"
        value={formData.gpa}
        onChange={handleChange}
        style={inputStyle}
      />
      <div style={buttonContainerStyle}>
        <button
          onClick={closeModal}
          style={{ ...buttonStyle, backgroundColor: "#f44336" }}
        >
          Cancel
        </button>
        <button
          onClick={nextStep}
          style={{ ...buttonStyle, backgroundColor: "#4CAF50" }}
        >
          Next
        </button>
      </div>
    </div>
  </div>
);

const ModalStep2 = ({
  formData,
  handleChange,
  handleExperienceChange,
  addExperienceField,
  handleProjectChange,
  addProjectField,
  nextStep,
  prevStep,
  closeModal,
}) => (
  <div style={modalStyle}>
    <div style={modalContentStyle}>
      <h2 style={{ color: "#228B22" }}>Experience & Tech Stack</h2>
      {formData.experiences.map((experience, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            name={`experience-${index}`}
            placeholder="Experience"
            value={experience}
            onChange={(e) => handleExperienceChange(index, e.target.value)}
            style={inputStyle}
          />
          {index === formData.experiences.length - 1 && (
            <button onClick={addExperienceField} style={addButtonStyle}>
              +
            </button>
          )}
        </div>
      ))}
      <input
        type="text"
        name="techStack"
        placeholder="Tech Stack"
        value={formData.techStack}
        onChange={handleChange}
        style={inputStyle}
      />
      <h2 style={{ color: "#228B22" }}>Projects</h2>
      {formData.projects.map((project, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            name={`project-${index}`}
            placeholder="Project"
            value={project}
            onChange={(e) => handleProjectChange(index, e.target.value)}
            style={inputStyle}
          />
          {index === formData.projects.length - 1 && (
            <button onClick={addProjectField} style={addButtonStyle}>
              +
            </button>
          )}
        </div>
      ))}
      <div style={buttonContainerStyle}>
        <button
          onClick={prevStep}
          style={{ ...buttonStyle, backgroundColor: "#2196F3" }}
        >
          Back
        </button>
        <button
          onClick={closeModal}
          style={{ ...buttonStyle, backgroundColor: "#f44336" }}
        >
          Cancel
        </button>
        <button
          onClick={nextStep}
          style={{ ...buttonStyle, backgroundColor: "#4CAF50" }}
        >
          Next
        </button>
      </div>
    </div>
  </div>
);

const ModalStep3 = ({
  formData,
  handleChange,
  nextStep,
  prevStep,
  closeModal,
}) => (
  <div style={modalStyle}>
    <div style={modalContentStyle}>
      <h2 style={{ color: "#228B22" }}>Summary</h2>
      <textarea
        name="summary"
        placeholder="Summary"
        value={formData.summary}
        onChange={handleChange}
        style={textareaStyle}
      />
      <div style={buttonContainerStyle}>
        <button
          onClick={prevStep}
          style={{ ...buttonStyle, backgroundColor: "#2196F3" }}
        >
          Back
        </button>
        <button
          onClick={closeModal}
          style={{ ...buttonStyle, backgroundColor: "#f44336" }}
        >
          Cancel
        </button>
        <button
          onClick={nextStep}
          style={{ ...buttonStyle, backgroundColor: "#4CAF50" }}
        >
          Next
        </button>
      </div>
    </div>
  </div>
);

const ModalStep4 = ({
  formData,
  handleChange,
  prevStep,
  closeModal,
  handleSubmit,
  handleLinkedInToggle,
}) => (
  <div style={modalStyle}>
    <div style={modalContentStyle}>
      <h2 style={{ color: "#228B22" }}>Contact Info</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="tel"
        name="phoneNumber"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={handleChange}
        style={inputStyle}
      />
      <div style={{ margin: "10px 0" }}>
        <label>Do you have LinkedIn?</label>
        <div>
          <label>
            <input
              type="radio"
              name="hasLinkedIn"
              value="yes"
              checked={formData.hasLinkedIn === "yes"}
              onChange={handleLinkedInToggle}
              style={{ marginRight: "10px" }}
            />
            Yes
          </label>
          <label style={{ marginLeft: "20px" }}>
            <input
              type="radio"
              name="hasLinkedIn"
              value="no"
              checked={formData.hasLinkedIn === "no"}
              onChange={handleLinkedInToggle}
              style={{ marginRight: "10px" }}
            />
            No
          </label>
        </div>
      </div>
      {formData.hasLinkedIn === "yes" && (
        <input
          type="url"
          name="linkedIn"
          placeholder="LinkedIn"
          value={formData.linkedIn}
          onChange={handleChange}
          style={inputStyle}
        />
      )}
      <div style={buttonContainerStyle}>
        <button
          onClick={prevStep}
          style={{ ...buttonStyle, backgroundColor: "#2196F3" }}
        >
          Back
        </button>
        <button
          onClick={closeModal}
          style={{ ...buttonStyle, backgroundColor: "#f44336" }}
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          style={{ ...buttonStyle, backgroundColor: "#4CAF50" }}
        >
          Submit
        </button>
      </div>
    </div>
  </div>
);

const Modal = ({ showModal, setShowModal, handleSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    university: "",
    education: "",
    gpa: "",
    experiences: [""],
    techStack: "",
    projects: [""],
    summary: "",
    email: "",
    phoneNumber: "",
    linkedIn: "",
    hasLinkedIn: "no",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLinkedInToggle = (e) => {
    setFormData({ ...formData, hasLinkedIn: e.target.value });
    if (e.target.value === "no") {
      setFormData({ ...formData, linkedIn: "" });
    }
  };

  const handleExperienceChange = (index, value) => {
    const newExperiences = formData.experiences.slice();
    newExperiences[index] = value;
    setFormData({ ...formData, experiences: newExperiences });
  };

  const addExperienceField = () => {
    setFormData({ ...formData, experiences: [...formData.experiences, ""] });
  };

  const handleProjectChange = (index, value) => {
    const newProjects = formData.projects.slice();
    newProjects[index] = value;
    setFormData({ ...formData, projects: newProjects });
  };

  const addProjectField = () => {
    setFormData({ ...formData, projects: [...formData.projects, ""] });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const closeModal = () => setShowModal(false);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
    setShowModal(false);
  };

  if (!showModal) return null;

  switch (step) {
    case 1:
      return (
        <ModalStep1
          formData={formData}
          handleChange={handleChange}
          nextStep={nextStep}
          closeModal={closeModal}
        />
      );
    case 2:
      return (
        <ModalStep2
          formData={formData}
          handleChange={handleChange}
          handleExperienceChange={handleExperienceChange}
          addExperienceField={addExperienceField}
          handleProjectChange={handleProjectChange}
          addProjectField={addProjectField}
          nextStep={nextStep}
          prevStep={prevStep}
          closeModal={closeModal}
        />
      );
    case 3:
      return (
        <ModalStep3
          formData={formData}
          handleChange={handleChange}
          nextStep={nextStep}
          prevStep={prevStep}
          closeModal={closeModal}
        />
      );
    case 4:
      return (
        <ModalStep4
          formData={formData}
          handleChange={handleChange}
          prevStep={prevStep}
          closeModal={closeModal}
          handleSubmit={handleFormSubmit}
          handleLinkedInToggle={handleLinkedInToggle}
        />
      );
    default:
      return null;
  }
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
  width: "400px",
  display: "flex",
  flexDirection: "column",
  color: "black",
};

const inputStyle = {
  width: "90%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const textareaStyle = {
  width: "90%",
  height: "100px",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const addButtonStyle = {
  padding: "10px 15px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginLeft: "10px",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  margin: "10px 5px",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
};

export default Modal;
