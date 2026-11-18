import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px", padding: "20px" }}>
      <h1 style={{ color: "#660058", fontSize: "2.5rem" }}>
        Welcome to UCU Lost and Found
      </h1>
      <p style={{ fontSize: "1.2rem", color: "#555", marginBottom: "30px" }}>
        The official platform to report lost items and return found items on
        campus.
      </p>

      <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
        <Link
          to="/report-lost"
          style={{
            padding: "12px 24px",
            backgroundColor: "#00cccc",
            color: "white",
            textDecoration: "none",
            borderRadius: "5px",
          }}
        >
          Report a Lost Item
        </Link>
        <Link
          to="/report-found"
          style={{
            padding: "12px 24px",
            backgroundColor: "#366600",
            color: "white",
            textDecoration: "none",
            borderRadius: "5px",
          }}
        >
          Report a Found Item
        </Link>
      </div>
    </div>
  );
}
