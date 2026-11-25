import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: email,
          password: password,
        },
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Force a page reload to update the Navbar immediately
      window.location.href = "/";
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error);
      } else {
        setError("Server error. Please try again.");
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 70px)",
        backgroundImage: 'url("/ucu-campus.jpg")', // Make sure this image is also in the public folder!
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {/* White Login Card */}
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          width: "100%",
          maxWidth: "450px",
          textAlign: "center",
        }}
      >
        {/* Logo and Header */}
        <img
          src="/ucu-logo.jpg"
          alt="UCU Logo"
          style={{ height: "80px", marginBottom: "20px" }}
        />
        <h2
          style={{
            color: "#003366",
            margin: "0 0 10px 0",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          UCU Lost & Found
        </h2>
        <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "30px" }}>
          Sign in to manage your reports and claims
        </p>

        {error && (
          <div
            style={{
              backgroundColor: "#ffe6e6",
              color: "#cc0000",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "20px",
              fontSize: "0.9rem",
              textAlign: "left",
            }}
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <div style={{ textAlign: "left" }}>
            <label
              style={{ fontWeight: "bold", fontSize: "0.9rem", color: "#333" }}
            >
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "5px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                boxSizing: "border-box",
              }}
              placeholder="student@ucu.ac.ug"
              required
            />
          </div>
          <div style={{ textAlign: "left" }}>
            <label
              style={{ fontWeight: "bold", fontSize: "0.9rem", color: "#333" }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "5px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                boxSizing: "border-box",
              }}
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            style={{
              padding: "14px",
              backgroundColor: "#cc0066",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Login
          </button>
        </form>

        <p style={{ marginTop: "20px", fontSize: "0.9rem", color: "#555" }}>
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "#003366",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
