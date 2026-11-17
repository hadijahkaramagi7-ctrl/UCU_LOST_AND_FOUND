import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";

// YOUR WORK: The Homepage Component
const Home = () => (
  <div>
    {/* Hero Section */}
    <div
      style={{
        backgroundColor: "#e6f0fa",
        padding: "4rem 2rem",
        textAlign: "center",
      }}
    >
      <h1
        style={{ fontSize: "2.5rem", color: "#003366", marginBottom: "1rem" }}
      >
        Welcome to UCU Lost and Found
      </h1>
      <p style={{ fontSize: "1.2rem", color: "#555", marginBottom: "2rem" }}>
        The official platform to report lost items and return found items on
        campus.
      </p>
      <div>
        <a
          href="/report-lost"
          style={{
            padding: "12px 24px",
            backgroundColor: "#cc0000",
            color: "white",
            marginRight: "15px",
            borderRadius: "5px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Report a Lost Item
        </a>
        <a
          href="/report-found"
          style={{
            padding: "12px 24px",
            backgroundColor: "#008000",
            color: "white",
            borderRadius: "5px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Report a Found Item
        </a>
      </div>
    </div>

    {/* Recent Items Section (Placeholder) */}
    <div style={{ padding: "3rem 2rem", textAlign: "center" }}>
      <h2 style={{ color: "#003366", marginBottom: "1.5rem" }}>
        Recently Reported Items
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            borderRadius: "8px",
            width: "250px",
            backgroundColor: "white",
          }}
        >
          <h3 style={{ margin: "0 0 10px 0" }}>Lost: Black Backpack</h3>
          <p style={{ color: "#666" }}>Location: Library</p>
        </div>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            borderRadius: "8px",
            width: "250px",
            backgroundColor: "white",
          }}
        >
          <h3 style={{ margin: "0 0 10px 0" }}>Found: Set of Keys</h3>
          <p style={{ color: "#666" }}>Location: N5B</p>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Sarah will add her <Route path="/login" ... /> here later */}
        {/* Norah will add her <Route path="/search" ... /> here later */}
      </Routes>
    </Router>
  );
}

export default App;
