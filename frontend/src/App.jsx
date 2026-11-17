import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Welcome to UCU Campus Lost and Found</h1>
        <p style={{ marginTop: "1rem", fontSize: "1.2rem" }}>
          Lost something? Found something? We are here to help you reconnect
          with your belongings.
        </p>

        <div style={{ marginTop: "2rem" }}>
          <a
            href="/report-lost"
            style={{
              padding: "10px 20px",
              backgroundColor: "#cc0000",
              color: "white",
              marginRight: "10px",
              borderRadius: "5px",
            }}
          >
            Report a Lost Item
          </a>

          <a
            href="/report-found"
            style={{
              padding: "10px 20px",
              backgroundColor: "#008000",
              color: "white",
              borderRadius: "5px",
            }}
          >
            Report a Found Item
          </a>
        </div>
      </main>
    </div>
  );
}

export default App;
