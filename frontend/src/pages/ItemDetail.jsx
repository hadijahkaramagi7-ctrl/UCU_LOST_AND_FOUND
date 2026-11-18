import { Link, useParams } from "react-router-dom";
import { reportedItems } from "./Items";
import "./ItemDetail.css";

export default function ItemDetail() {
  const { id } = useParams();
  const item = reportedItems.find(
    (reportedItem) => reportedItem.id === Number(id),
  );

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
