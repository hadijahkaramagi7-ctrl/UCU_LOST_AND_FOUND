import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";

// YOUR WORK: The Homepage Component
const Home = () => (
  <div style={{ minHeight: "80vh" }}>
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

      {/* Search Bar */}
      <div style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Search for keys, phones, books..."
          style={{
            padding: "12px",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <button
          style={{
            padding: "12px 20px",
            backgroundColor: "#003366",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

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
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ margin: "0 0 10px 0" }}>Lost: Black Backpack</h3>
          <p style={{ color: "#666", margin: 0 }}>Location: Library</p>
        </div>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            borderRadius: "8px",
            width: "250px",
            backgroundColor: "white",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ margin: "0 0 10px 0" }}>Found: Set of Keys</h3>
          <p style={{ color: "#666", margin: 0 }}>Location: N5B</p>
        </div>
      </div>
    </div>
  </div>
);

// YOUR WORK: The Footer Component
const Footer = () => (
  <footer
    style={{
      backgroundColor: "#003366",
      color: "white",
      textAlign: "center",
      padding: "1.5rem",
      marginTop: "auto",
    }}
  >
    <p style={{ margin: "0 0 5px 0" }}>
      © 2026 Uganda Christian University Lost & Found
    </p>
    <p style={{ margin: 0, fontSize: "0.9rem", color: "#ccc" }}>
      A project for CSC1202 Web and Mobile Applications Development
    </p>
  </footer>
);

function App() {
  return (
    <Router>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Sarah will add her <Route path="/login" ... /> here later */}
          {/* Norah will add her <Route path="/search" ... /> here later */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
