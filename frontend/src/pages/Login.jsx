import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // This line automatically adds the UCU domain to the access number
    const fullEmail = `${email.toLowerCase()}@students.ucu.ac.ug`;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: fullEmail, // <-- We send the fullEmail here now!
          password: password,
        },
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

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
        backgroundImage: 'url("/ucu-campus.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
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
              Access Number
            </label>
            <input
              type="text"
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
              placeholder="e.g. B36758"
              required
            />
          </div>
          <div style={{ textAlign: "left", position: "relative" }}>
            <label
              style={{ fontWeight: "bold", fontSize: "0.9rem", color: "#333" }}
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                paddingRight: "40px",
                marginTop: "5px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                boxSizing: "border-box",
              }}
              placeholder="••••••••"
              required
            />

            {/* Eye Icon Toggle */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "12px",
                top: "38px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#666",
                display: "flex",
                alignItems: "center",
              }}
            >
              {showPassword ? (
                // Eye Off (Hide)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              ) : (
                // Eye (Show)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              )}
            </button>
          </div>
          <button
            type="submit"
            style={{
              padding: "14px",
              backgroundColor: "#c8102e",
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
