import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const recentlyReportedItems = [
    {
      id: 1,
      status: "LOST",
      name: "Student ID",
      location: "Ham Mukasa Library",
      date: "18 Nov 2026",
    },
    {
      id: 2,
      status: "FOUND",
      name: "Black Wallet",
      location: "Cafeteria",
      date: "17 Nov 2026",
    },
    {
      id: 3,
      status: "LOST",
      name: "iPhone 11",
      location: "Lecture Room B2",
      date: "16 Nov 2026",
    },
    {
      id: 4,
      status: "FOUND",
      name: "Keychain",
      location: "Main Entrance",
      date: "15 Nov 2026",
    },
    {
      id: 5,
      status: "LOST",
      name: "Textbook",
      location: "Library Study Room",
      date: "14 Nov 2026",
    },
    {
      id: 6,
      status: "FOUND",
      name: "Glasses",
      location: "Cafeteria",
      date: "13 Nov 2026",
    },
  ];

  const filteredItems = recentlyReportedItems.filter((item) => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return true;

    return [item.status, item.name, item.location, item.date]
      .join(" ")
      .toLowerCase()
      .includes(query);
  });

  const handleSearch = (event) => {
    event.preventDefault();
  };

  return (
    <div className="home-page">
      <main className="home-content">
        <section className="hero-section">
          <h1>Welcome to UCU Lost and Found</h1>
          <p>
            The official platform to report lost items and return found items on
            campus.
          </p>

          <div className="home-actions">
            <button
              type="button"
              className="report-button lost"
              onClick={() => navigate("/report")}
            >
              Report Lost
            </button>
            <button
              type="button"
              className="report-button found"
              onClick={() => navigate("/report")}
            >
              Report Found
            </button>
          </div>

          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search for your lost item... e.g. Student ID, keys, wallet"
              aria-label="Search for a lost item"
            />
            <button type="submit">Search</button>
          </form>
        </section>

        <section
          className="stats-section"
          aria-label="Lost and found statistics"
        >
          <div className="stat-item">
            <strong>248</strong>
            <span>Items Reported</span>
          </div>
          <div className="stat-item">
            <strong>173</strong>
            <span>Items Returned</span>
          </div>
          <div className="stat-item">
            <strong>320</strong>
            <span>Students Helped</span>
          </div>
        </section>

        <section className="items-section">
          <h2>Recently Reported Items</h2>
          <div className="items-grid">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <article className="item-card" key={item.id}>
                  <span className={`item-status ${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                  <h3>{item.name}</h3>
                  <p>{item.location}</p>
                  <p className="item-date">{item.date}</p>
                  <Link to={`/items/${item.id}`} className="details-button">
                    View Details
                  </Link>
                </article>
              ))
            ) : (
              <p className="no-items-found">No items found</p>
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <button
              type="button"
              onClick={() => navigate("/items")}
              style={{
                padding: "12px 24px",
                border: 0,
                borderRadius: "6px",
                background: "#003366",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              View All Items
            </button>
          </div>
        </section>

        <section className="how-it-works">
          <h2>How It Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <span>1</span>
              <p>Report your item</p>
            </div>
            <div className="step-card">
              <span>2</span>
              <p>We match it</p>
            </div>
            <div className="step-card">
              <span>3</span>
              <p>You claim it</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        UCU Lost &amp; Found | Mukono Campus | lostandfound@ucu.ac.ug
      </footer>
    </div>
  );
}
