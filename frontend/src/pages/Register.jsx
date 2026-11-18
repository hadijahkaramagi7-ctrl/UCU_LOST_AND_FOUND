import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name: name,
        email: email,
        password: password,
      });

      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      if (err.response && err.response.data) {
        alert(err.response.data.error);
      } else {
        alert("Server error. Please try again.");
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}>
      <h2>Create an Account</h2>

      <form
        onSubmit={handleRegister}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#cc0000",
            color: "white",
          }}
        >
          Register
        </button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}
