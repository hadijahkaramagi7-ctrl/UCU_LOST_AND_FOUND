import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ItemDetail.css";

export default function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/reports/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Item not found");
        return response.json();
      })
      .then((report) => {
        setItem({
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
          description: report.public_description,
          category: report.category,
          statusValue: report.status,
        });
      })
      .catch((error) => {
        console.error(error);
        setItem(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!item) {
    return (
      <main className="item-detail-page">
        <section className="item-detail-card item-not-found">
          <h1>Item not found</h1>
          <Link to="/items" className="detail-button secondary">
            Back to All Items
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="item-detail-page">
      <article className="item-detail-card">
        <span className={`item-status ${item.status.toLowerCase()}`}>
          {item.status}
        </span>
        <h1>{item.name}</h1>

        <div className="item-detail-layout">
          <div className="item-detail-main">
            <h2>Description</h2>
            <p>{item.description}</p>
          </div>

          <aside className="item-detail-meta">
            <p>
              <strong>Location</strong>
              <span>{item.location}</span>
            </p>
            <p>
              <strong>Date reported</strong>
              <span>{item.date}</span>
            </p>
            <p>
              <strong>Contact</strong>
              <a href="mailto:lostandfound@ucu.ac.ug">lostandfound@ucu.ac.ug</a>
            </p>
          </aside>
        </div>

        <div className="item-detail-actions">
          <Link to="/report" className="detail-button primary">
            Claim This Item
          </Link>
          <Link to="/items" className="detail-button secondary">
            Back to All Items
          </Link>
        </div>
      </article>
    </main>
  );
}
