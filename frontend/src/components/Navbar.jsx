import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  // Check if a user is logged in
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const handleLogout = () => {
    // Clear the user session
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Redirect to login page
    navigate("/login");
    // Force a page reload to update the navbar
    window.location.reload();
  };

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
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/items" style={{ color: "white", textDecoration: "none" }}>
          Items
        </Link>

        {user ? (
          <>
            <Link
              to="/claims"
              style={{ color: "white", textDecoration: "none" }}
            >
              Claims
            </Link>

            {/* ONLY show Admin link if the user role is 'admin' */}
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

            <button
              onClick={handleLogout}
              style={{
                padding: "5px 10px",
                backgroundColor: "#cc0000",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{ color: "white", textDecoration: "none" }}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{ color: "white", textDecoration: "none" }}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
