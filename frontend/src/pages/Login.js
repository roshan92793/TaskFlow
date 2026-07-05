import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handelSuccess, handelError } from "../utils";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    // Simple validation
    if (!email || !password) {
      return handelError("Email and password are required");
    }

    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      const { success, message, token, username, error } = result;

      if (success) {
        handelSuccess(message || "Login successful!");
        localStorage.setItem("token", token);
        localStorage.setItem("loggedInUser", username);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const details = error?.details?.[0]?.message || error;
        handelError(details);
      } else if (message) {
        handelError(message);
      } else {
        handelError("Login failed. Please try again.");
      }
    } catch (err) {
      handelError(err.message || "An error occurred during login");
    }
  };

  return (
    <div className="auth-container">
      <div className="bg-decor-container">
        <div className="auth-circle1"></div>
        <div className="auth-circle2"></div>
      </div>

      {/* Left Side Content */}
      <div className="auth-hero">
        <h1 className="auth-hero-title">🚀 TaskFlow </h1>

        <p className="auth-hero-text">
          Stay organized, manage tasks efficiently, and boost your productivity.
          Keep track of your daily goals with a simple and powerful Todo App.
        </p>

        <div className="auth-feature-box">
          <p>✅ Create unlimited tasks</p>
          <p>✏️ Edit tasks anytime</p>
          <p>🗑️ Delete completed tasks</p>
          <p>🚀 Stay productive every day</p>
          <p>🔒 Secure login & user management</p>
        </div>
      </div>

      {/* Login Card */}
      <div className="auth-card">
        <h1 className="auth-heading">Login</h1>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="auth-form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={loginInfo.email}
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
              value={loginInfo.password}
              onChange={handleChange}
              className="auth-input"
            />
          </div>

          <button type="submit" className="auth-button">
            Login
          </button>

          <span className="auth-footer">
            Don't have an account?{" "}
            <Link to="/signup" className="auth-link">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;