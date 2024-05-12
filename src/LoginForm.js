import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBubbles, setShowBubbles] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (showBubbles) {
      const timer = setTimeout(() => {
        navigate("/home2");
      }, 3000); // Adjust to match animation duration if needed
      return () => clearTimeout(timer);
    }
  }, [showBubbles, navigate]);

  function validateLogin(username, password) {
    let newErrors = { username: "", password: "" };

    if (username !== "root") {
      newErrors.username = "Incorrect username";
    }
    if (password !== "root123") {
      newErrors.password = "Incorrect password";
    }

    return newErrors;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const newErrors = validateLogin(username, password);
    setErrors(newErrors);

    if (!newErrors.username && !newErrors.password) {
      setShowBubbles(true); // Trigger bubble animation
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      {showBubbles && (
        <div className="bubble-container">
          {Array.from({ length: 20 }).map((_, idx) => (
            <div
              key={idx}
              className="bubble"
              style={{
                animationDelay: `${Math.random() * 1.5}s`, // Reduce max delay to ensure all bubbles start before navigation
                left: `${Math.random() * 100}%`, // Allow full width for starting position
                width: `${30 + Math.random() * 20}px`, // More consistent bubble size
                height: `${30 + Math.random() * 20}px`, // Same random height as width for a circle
                animationDuration: `${3 + Math.random() * 2}s`, // Keep duration within a closer range
              }}
            />
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`login-input ${errors.username ? "input-error" : ""}`}
            required
          />
          <div className="error-message">{errors.username}</div>
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`login-input ${errors.password ? "input-error" : ""}`}
            required
          />
          <div className="error-message">{errors.password}</div>
        </div>
        <button type="submit" className="login-button" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
