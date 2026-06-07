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
      const url = "https://taskflow-xu1n.onrender.com/auth/login";
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

  const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 8%",
    background:
      "linear-gradient(135deg, #0f172a, #1e293b, #334155)",
    fontFamily: "'Poppins', sans-serif",
    overflow: "hidden",
    position: "relative",
  },

  heroSection: {
    flex: 1,
    color: "#fff",
    maxWidth: "550px",
  },

  heroTitle: {
    fontSize: "4rem",
    fontWeight: "bold",
    marginBottom: "20px",
    background: "linear-gradient(to right, #38bdf8, #22c55e)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  heroText: {
    fontSize: "1.3rem",
    lineHeight: "1.8",
    color: "#cbd5e1",
  },

  featureBox: {
    marginTop: "30px",
    padding: "25px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 0 25px rgba(56,189,248,0.2)",
    lineHeight: "2",
    color: "#fff",
  },

  card: {
    width: "400px",
    background: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(15px)",
    WebkitBackdropFilter: "blur(15px)",
    border: "1px solid rgba(255,255,255,0.2)",
    padding: "35px",
    borderRadius: "20px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
    color: "#fff",
    zIndex: 2,
  },

  heading: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "2rem",
    fontWeight: "700",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  input: {
    width: "100%",
    padding: "14px",
    marginTop: "5px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.08)",
    color: "#fff",
    outline: "none",
    boxSizing: "border-box",
  },

  button: {
    padding: "14px",
    background:
      "linear-gradient(135deg, #22c55e, #38bdf8)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "700",
  },

  span: {
    textAlign: "center",
    marginTop: "10px",
    color: "#fff",
  },

  link: {
    color: "#38bdf8",
    textDecoration: "none",
    fontWeight: "bold",
  },

  circle1: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "rgba(56,189,248,0.25)",
    top: "-100px",
    left: "-100px",
    filter: "blur(60px)",
  },

  circle2: {
    position: "absolute",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background: "rgba(34,197,94,0.2)",
    bottom: "-120px",
    right: "-120px",
    filter: "blur(80px)",
  },
};

  return (
  <div style={styles.container}>
    <div style={styles.circle1}></div>
    <div style={styles.circle2}></div>

    {/* Left Side Content */}
    <div style={styles.heroSection}>
      <h1 style={styles.heroTitle}> Todo WebApp</h1>

      <p style={styles.heroText}>
        Stay organized, manage tasks efficiently, and boost your productivity.
        Keep track of your daily goals with a simple and powerful Todo App.
      </p>

      <div style={styles.featureBox}>
        <p>✅ Create unlimited tasks</p>
        <p>✏️ Edit tasks anytime</p>
        <p>🗑️ Delete completed tasks</p>
        <p>🚀 Stay productive every day</p>
        <p>🔒 Secure login & user management</p>
      </div>
    </div>

    {/* Login Card */}
    <div style={styles.card}>
      <h1 style={styles.heading}>Login</h1>

      <form onSubmit={handleLogin} style={styles.form}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email..."
            value={loginInfo.email}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password..."
            value={loginInfo.password}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button}>
          Login
        </button>

        <span style={styles.span}>
          Don't have an account?{" "}
          <Link to="/signup" style={styles.link}>
            Signup
          </Link>
        </span>
      </form>
    </div>
  </div>
);
}

export default Login;