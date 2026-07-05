import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handelSuccess, handelError } from "../utils";

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSignupInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { username, email, password } = signupInfo;

    // Simple frontend validation
    if (!username || !email || !password) {
      return handelError("All fields (username, email, password) are required");
    }
    if (username.length < 3) {
      return handelError("Username must be at least 3 characters long");
    }
    if (password.length < 6) {
      return handelError("Password must be at least 6 characters long");
    }

    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handelSuccess(message || "Signup successful!");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        // Handle Joi validation error messages (which are inside result.error)
        const details = error?.details?.[0]?.message || error;
        handelError(details);
      } else if (message) {
        handelError(message);
      } else {
        handelError("Signup failed. Please try again.");
      }
    } catch (err) {
      handelError(err.message || "An error occurred during signup");
    }
  };

  return (
    <div className="auth-container">
      <div className="bg-decor-container">
        <div className="auth-circle1"></div>
        <div className="auth-circle2"></div>
      </div>

      {/* Left Hero Section */}
      <div className="auth-hero">
        <h1 className="auth-hero-title">
          🚀 TaskFlow
        </h1>

        <p className="auth-hero-text">
          Create your account and start managing your
          tasks efficiently with our modern productivity
          dashboard.
        </p>

        <div className="auth-feature-box">
          <p>✅ Create unlimited tasks</p>
          <p>✏️ Edit tasks anytime</p>
          <p>🗑️ Delete completed tasks</p>
          <p>🚀 Stay productive every day</p>
          <p>🔒 Secure login & user management</p>
        </div>
      </div>

      {/* Signup Card */}
      <div className="auth-card">
        <h1 className="auth-heading">Create Account</h1>

        <form onSubmit={handleSignup} className="auth-form">
          <div className="auth-form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username..."
              value={signupInfo.username}
              onChange={handleChange}
              className="auth-input"
            />
          </div>

          <div className="auth-form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={signupInfo.email}
              onChange={handleChange}
              className="auth-input"
            />
          </div>

          <div className="auth-form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password..."
              value={signupInfo.password}
              onChange={handleChange}
              className="auth-input"
            />
          </div>

          <button type="submit" className="auth-button">
            Create Account
          </button>

          <div className="auth-footer">
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;