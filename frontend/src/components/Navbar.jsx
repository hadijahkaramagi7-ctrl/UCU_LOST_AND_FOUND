import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        padding: "15px",
        backgroundColor: "#003366",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2 style={{ color: "white", margin: 0 }}>UCU Lost & Found</h2>
      <div style={{ display: "flex", gap: "15px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
          Login
        </Link>
        <Link to="/register" style={{ color: "white", textDecoration: "none" }}>
          Register
        </Link>
      </div>
    </nav>
  );
}
