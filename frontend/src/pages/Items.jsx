import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Items.css";

export default function Items() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [reportedItems, setReportedItems] = useState([]);
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
            category: report.category,
            description: report.public_description,
            statusValue: report.status,
          }));

        setReportedItems(normalizedReports);
      })
      .catch((error) => {
        console.error(error);
        setLoadError(true);
        setReportedItems([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredItems = reportedItems.filter((item) => {
    const matchesStatus =
      statusFilter === "ALL" || item.status === statusFilter;
    const query = searchQuery.trim().toLowerCase();

    const matchesSearch =
      !query ||
      [item.status, item.name, item.location, item.date]
        .join(" ")
        .toLowerCase()
        .includes(query);

    return matchesStatus && matchesSearch;
  });

  return (
    <main className="items-page">
      <section className="items-header">
        <p className="items-eyebrow">UCU Lost &amp; Found</p>
        <h1>Reported Items</h1>
        <p>Search for a lost or found item on campus.</p>
      </section>

      <section className="items-controls" aria-label="Search and filter items">
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search by item, location, status, or date..."
          aria-label="Search reported items"
        />

        <div className="status-filter" aria-label="Filter items by status">
          {["ALL", "LOST", "FOUND"].map((status) => (
            <button
              type="button"
              key={status}
              className={statusFilter === status ? "active" : ""}
              onClick={() => setStatusFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </section>

      {loading ? (
        <p className="items-no-results">Loading...</p>
      ) : loadError ? (
        <p className="items-no-results">Failed to load items</p>
      ) : filteredItems.length > 0 ? (
        <section className="all-items-grid">
          {filteredItems.map((item) => (
            <article className="all-item-card" key={item.id}>
              <span className={`item-status ${item.status.toLowerCase()}`}>
                {item.status}
              </span>
              <h2>{item.name}</h2>
              <p>
                <strong>Location:</strong> {item.location}
              </p>
              <p>
                <strong>Date reported:</strong> {item.date}
              </p>
              <Link to={`/items/${item.id}`} className="item-details-button">
                View Details
              </Link>
            </article>
          ))}
        </section>
      ) : reportedItems.length === 0 ? (
        <p className="items-no-results">No items reported yet</p>
      ) : (
        <p className="items-no-results">No items found</p>
      )}
    </main>
  );
}
