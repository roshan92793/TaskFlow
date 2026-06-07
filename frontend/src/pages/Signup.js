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
      const url = "https://taskflow-xu1n.onrender.com/auth/signup";
      const response = await fetch(url, {
      method: "POST",
      headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(signupInfo)
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

  const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "60px",
    flexWrap: "wrap",
    padding: "40px",
    background:
      "linear-gradient(135deg, #0f172a, #1e293b, #334155)",
    fontFamily: "'Poppins', sans-serif",
    position: "relative",
    overflow: "hidden",
    boxSizing: "border-box",
  },

  heroSection: {
    flex: 1,
    maxWidth: "500px",
    minWidth: "320px",
    color: "#fff",
    zIndex: 2,
  },

  heroTitle: {
    fontSize: "clamp(2.5rem, 5vw, 4rem)",
    fontWeight: "bold",
    marginBottom: "20px",
    lineHeight: "1.1",
    background:
      "linear-gradient(to right, #38bdf8, #22c55e)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  heroText: {
    fontSize: "1.2rem",
    lineHeight: "1.8",
    color: "#cbd5e1",
  },

  featureBox: {
    marginTop: "30px",
    padding: "25px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 0 25px rgba(56,189,248,0.15)",
    lineHeight: "2",
    color: "#fff",
  },

  card: {
    width: "100%",
    maxWidth: "450px",
    minWidth: "320px",
    background: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(15px)",
    WebkitBackdropFilter: "blur(15px)",
    border: "1px solid rgba(255,255,255,0.2)",
    padding: "35px",
    borderRadius: "24px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
    color: "#fff",
    zIndex: 2,
  },

  heading: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "2.2rem",
    fontWeight: "700",
    color: "#fff",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#f8f9ff",
  },

  input: {
    width: "100%",
    padding: "14px",
    marginTop: "6px",
    border: "1px solid rgba(255,255,255,0.25)",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.08)",
    color: "#fff",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
  },

  button: {
    marginTop: "10px",
    padding: "14px",
    background:
      "linear-gradient(135deg, #22c55e, #38bdf8)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "700",
    boxShadow: "0 5px 15px rgba(56,189,248,0.35)",
  },

  footer: {
    textAlign: "center",
    marginTop: "20px",
    color: "#f5f5f5",
  },

  link: {
    color: "#38bdf8",
    textDecoration: "none",
    fontWeight: "700",
  },

  circle1: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "rgba(56,189,248,0.25)",
    top: "-120px",
    left: "-120px",
    filter: "blur(80px)",
    pointerEvents: "none",
  },

  circle2: {
    position: "absolute",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background: "rgba(34,197,94,0.2)",
    bottom: "-120px",
    right: "-120px",
    filter: "blur(90px)",
    pointerEvents: "none",
  },
};

  return (
  <div style={styles.container}>
    <div style={styles.circle1}></div>
    <div style={styles.circle2}></div>

    {/* Left Hero Section */}
    <div style={styles.heroSection}>
      <h1 style={styles.heroTitle}>
        TaskFlow 🚀
      </h1>

      <p style={styles.heroText}>
        Create your account and start managing your
        tasks efficiently with our modern productivity
        dashboard.
      </p>

      <div style={styles.featureBox}>
        <div>✅ Create Unlimited Tasks</div>
        <div>✅ Edit & Track Progress</div>
        <div>✅ Secure Authentication</div>
        <div>✅ Personal Dashboard</div>
        <div>✅ Beautiful User Experience</div>
      </div>
    </div>

    {/* Signup Card */}
    <div style={styles.card}>
      <h1 style={styles.heading}>Create Account</h1>

      <form onSubmit={handleSignup} style={styles.form}>
        <div>
          <label style={styles.label}>Username</label>

          <input
            type="text"
            name="username"
            placeholder="Enter your username..."
            value={signupInfo.username}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div>
          <label style={styles.label}>Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email..."
            value={signupInfo.email}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div>
          <label style={styles.label}>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Enter your password..."
            value={signupInfo.password}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button}>
          Create Account
        </button>

        <div style={styles.footer}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </div>
      </form>
    </div>
  </div>
);
}

export default Signup;