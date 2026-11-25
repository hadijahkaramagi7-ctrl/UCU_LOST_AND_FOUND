import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  // Check if a user is currently logged in
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const handleLogout = () => {
    // Clear the session from the browser
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to login page and refresh to update the navbar
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav
      style={{
        padding: "15px 30px",
        backgroundColor: "#003366",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      {/* Logo and Brand Name */}
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          textDecoration: "none",
        }}
      >
        <img
          src="/ucu-logo.jpg"
          alt="UCU Logo"
          style={{
            height: "45px",
            borderRadius: "50%",
            backgroundColor: "white",
            padding: "2px",
          }}
        />
        <h2 style={{ color: "white", margin: 0, fontSize: "1.4rem" }}>
          UCU Lost & Found
        </h2>
      </Link>

      {/* Navigation Links */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link
          to="/"
          style={{ color: "white", textDecoration: "none", fontWeight: "500" }}
        >
          Home
        </Link>
        <Link
          to="/items"
          style={{ color: "white", textDecoration: "none", fontWeight: "500" }}
        >
          Items
        </Link>

        {/* If a user is logged in, show these links */}
        {user ? (
          <>
            <Link
              to="/claims"
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Claims
            </Link>

            {/* ONLY show this link if their role is 'admin' */}
            {user.role === "admin" && (
              <Link
                to="/admin"
                style={{
                  color: "#ffcc00",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                Admin Dashboard
              </Link>
            )}

            {/* Logout Button (Shows for Students and Admins) */}
            <button
              onClick={handleLogout}
              style={{
                padding: "8px 16px",
                backgroundColor: "#c8102e",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "0.9rem",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          /* If NO user is logged in, show Login and Register */
          <>
            <Link
              to="/login"
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
