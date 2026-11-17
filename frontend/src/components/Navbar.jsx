import React from "react";

const Navbar = () => {
  return (
    <nav
      style={{
        backgroundColor: "#003366", // UCU Blue
        color: "white",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>UCU Lost & Found</h2>
      <ul style={{ display: "flex", listStyle: "none", gap: "20px" }}>
        <li>
          <a href="/" style={{ color: "white", textDecoration: "none" }}>
            Home
          </a>
        </li>
        <li>
          <a href="/search" style={{ color: "white", textDecoration: "none" }}>
            Search Items
          </a>
        </li>
        <li>
          <a href="/login" style={{ color: "white", textDecoration: "none" }}>
            Login
          </a>
        </li>
        <li>
          <a
            href="/register"
            style={{ color: "white", textDecoration: "none" }}
          >
            Register
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
