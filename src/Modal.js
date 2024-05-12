import React, { useState } from "react";

const Modal = ({ showModal, setShowModal, handleSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    university: "",
    education: "",
    experience: "",
    techStack: "",
    projects: "",
    summary: "",
    email: "",
    phoneNumber: "",
    linkedIn: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    // Email validation
    if (!formData.email) {
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formIsValid = false;
      errors["email"] = "Email is not valid";
    }

    // Phone Number validation
    if (!formData.phoneNumber) {
      formIsValid = false;
      errors["phoneNumber"] = "Cannot be empty";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      formIsValid = false;
      errors["phoneNumber"] = "Phone number is not valid. Should be 10 digits";
    }

    // LinkedIn URL validation
    if (
      formData.linkedIn &&
      !/^https?:\/\/(www\.)?linkedin\.com\/.+$/.test(formData.linkedIn)
    ) {
      formIsValid = false;
      errors["linkedIn"] = "Invalid LinkedIn URL";
    }

    // Name field validation as required
    if (!formData.name.trim()) {
      formIsValid = false;
      errors["name"] = "Name is required";
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Ensure role and university are converted to uppercase before submitting
      const updatedFormData = {
        ...formData,
        role: formData.role.toUpperCase(),
        university: formData.university.toUpperCase(),
      };
      handleSubmit(updatedFormData); // Pass the updated form data to the handleSubmit function
      setShowModal(false);
    }
  };

  if (!showModal) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 5,
          width: "100%",
        }}
      >
        <h2>Create Your Portfolio</h2>
        <form onSubmit={handleFormSubmit}>
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <input
                type={
                  key === "email"
                    ? "email"
                    : key === "phoneNumber"
                    ? "tel"
                    : key === "linkedIn"
                    ? "url"
                    : "text"
                }
                name={key}
                placeholder={
                  key[0].toUpperCase() +
                  key
                    .slice(1)
                    .replace(/([A-Z])/g, " $1")
                    .trim()
                }
                value={formData[key]}
                onChange={handleChange}
                required={key !== "linkedIn"} // LinkedIn is not required
                style={{ width: "98%", padding: "10px", margin: "5px 0" }}
              />
              {errors[key] && <div style={{ color: "red" }}>{errors[key]}</div>}
            </div>
          ))}
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => setShowModal(false)}
            style={{
              padding: "10px 20px",
              marginLeft: "10px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
