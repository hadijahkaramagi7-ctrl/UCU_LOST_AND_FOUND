import { useState } from "react";
import { Link } from "react-router-dom";
import "./Items.css";

export const reportedItems = [
  {
    id: 1,
    status: "LOST",
    name: "Student ID",
    location: "Ham Mukasa Library",
    date: "18 Nov 2026",
    description:
      "Student identification card reported lost at Ham Mukasa Library. Please bring your student number and a valid ID to verify ownership before claiming.",
  },
  {
    id: 2,
    status: "FOUND",
    name: "Black Wallet",
    location: "Guild Canteen",
    date: "17 Nov 2026",
    description:
      "A black wallet was found in the Guild Canteen. It is being held by the Lost and Found office pending owner verification.",
  },
  {
    id: 3,
    status: "LOST",
    name: "iPhone 11",
    location: "Lecture Room B2",
    date: "16 Nov 2026",
    description:
      "An iPhone 11 was reported missing from Lecture Room B2. Please contact the office with identifiable details before collection.",
  },
  {
    id: 4,
    status: "FOUND",
    name: "Silver Laptop Charger",
    location: "Computer Lab",
    date: "15 Nov 2026",
    description:
      "A silver laptop charger was found in the computer lab. It is available for collection after ownership verification.",
  },
  {
    id: 5,
    status: "LOST",
    name: "Car Keys",
    location: "Main Gate",
    date: "14 Nov 2026",
    description:
      "A set of car keys was reported lost near the main gate. Please provide a description of the keyring when contacting the office.",
  },
  {
    id: 6,
    status: "FOUND",
    name: "Blue Water Bottle",
    location: "Football Field",
    date: "13 Nov 2026",
    description:
      "A blue water bottle was found near the football field. Bring any identifying details to verify ownership.",
  },
];

export default function Items() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

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

      {filteredItems.length > 0 ? (
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
      ) : (
        <p className="items-no-results">No items found</p>
      )}
    </main>
  );
}
