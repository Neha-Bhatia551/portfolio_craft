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
  const [hasLinkedIn, setHasLinkedIn] = useState(null); // Tracks LinkedIn profile presence

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRadioChange = (e) => {
    setHasLinkedIn(e.target.value === "yes");
    if (e.target.value === "no") {
      setFormData({ ...formData, linkedIn: "" }); // Clear LinkedIn field if "no" is selected
    }
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    // Validation logic for various fields
    if (!formData.email) {
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formIsValid = false;
      errors["email"] = "Email is not valid";
    }

    if (!formData.phoneNumber) {
      formIsValid = false;
      errors["phoneNumber"] = "Cannot be empty";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      formIsValid = false;
      errors["phoneNumber"] = "Phone number is not valid. Should be 10 digits";
    }

    if (
      hasLinkedIn &&
      !/^https?:\/\/(www\.)?linkedin\.com\/.+$/.test(formData.linkedIn)
    ) {
      formIsValid = false;
      errors["linkedIn"] = "Invalid LinkedIn URL";
    }

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
      handleSubmit(formData);
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
        <h2 style={{ color: "#228B22" }}>Create Your Portfolio</h2>
        <form onSubmit={handleFormSubmit}>
          {Object.keys(formData).map((key) => {
            // Render the LinkedIn question right after the phone number field
            if (key === "phoneNumber") {
              return (
                <>
                  <div key={key}>
                    <input
                      type="tel"
                      name={key}
                      placeholder="Phone Number"
                      value={formData[key]}
                      onChange={handleChange}
                      required
                      style={{ width: "98%", padding: "10px", margin: "5px 0" }}
                    />
                    {errors[key] && (
                      <div style={{ color: "red" }}>{errors[key]}</div>
                    )}
                  </div>
                  <div>
                    <label style={{ marginRight: "10px", color: "black" }}>
                      Do you have a LinkedIn profile?
                    </label>
                    <label style={{ color: "black" }}>
                      <input
                        type="radio"
                        name="hasLinkedIn"
                        value="yes"
                        checked={hasLinkedIn === true}
                        onChange={handleRadioChange}
                      />{" "}
                      Yes
                    </label>
                    <label style={{ marginLeft: "10px", color: "black" }}>
                      <input
                        type="radio"
                        name="hasLinkedIn"
                        value="no"
                        checked={hasLinkedIn === false}
                        onChange={handleRadioChange}
                      />{" "}
                      No
                    </label>
                  </div>
                </>
              );
            }
            if (key !== "linkedIn" || hasLinkedIn) {
              return (
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
                    required={key !== "linkedIn"}
                    style={{ width: "98%", padding: "10px", margin: "5px 0" }}
                  />
                  {errors[key] && (
                    <div style={{ color: "red" }}>{errors[key]}</div>
                  )}
                </div>
              );
            }
            return null;
          })}
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
