import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [recentlyReportedItems, setRecentlyReportedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/reports")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch reports");
        return response.json();
      })
      .then((reports) => {
        const normalizedReports = reports
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((report) => ({
            id: report.id,
            status: report.type?.toUpperCase() || "LOST",
            name: report.title,
            location: report.location,
            date: new Intl.DateTimeFormat("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              timeZone: "UTC",
            }).format(new Date(report.event_date || report.created_at)),
          }));

        setRecentlyReportedItems(normalizedReports);
      })
      .catch((error) => {
        console.error(error);
        setLoadError(true);
        setRecentlyReportedItems([]);
      })
      .finally(() => setLoading(false));
  }, []);

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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (loadError) {
    return <p>Failed to load reports. Please try again later.</p>;
  }

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
            {loading ? (
              <p className="no-items-found">Loading...</p>
            ) : loadError ? (
              <p className="no-items-found">Failed to load items</p>
            ) : filteredItems.length > 0 ? (
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
              <p className="no-items-found">
                {searchQuery ? "No items found" : "No items reported yet"}
              </p>
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
