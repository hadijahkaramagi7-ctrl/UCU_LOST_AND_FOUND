
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./Report.css";

function Report() {
  const { type: routeType } = useParams();
  const reportType = routeType?.toLowerCase() === "found" ? "Found" : "Lost";

  const [formData, setFormData] = useState({
    type: reportType,
    itemName: "",
    category: "",
    location: "",
    date: "",
    description: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Report submitted:", formData);
    console.log("Item image:", image);

    alert("Your report has been created!");

    setFormData({
      type: reportType,
      itemName: "",
      category: "",
      location: "",
      date: "",
      description: "",
    });

    setImage(null);
  };

  return (
    <main className="report-page">
      <section className="report-panel" aria-labelledby="report-title">
        <header className="report-header">
          <div>
            <p className="report-eyebrow">UCU Campus Services</p>
            <h1 id="report-title">Submit a {formData.type.toLowerCase()} item report</h1>
          </div>
          <span className={`report-status ${formData.type.toLowerCase()}`}>
            {formData.type} item
          </span>
        </header>

        <p className="report-intro">
          Provide clear and accurate details to help identify and return the item.
        </p>

        <form onSubmit={handleSubmit} className="report-form">
          <div className="form-field">
            <label htmlFor="report-type">Report type</label>
            <select
              id="report-type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="Lost">Lost item</option>
              <option value="Found">Found item</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="item-name">Item name</label>
            <input
              id="item-name"
              type="text"
              name="itemName"
              placeholder="Example: Black backpack"
              value={formData.itemName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                <option>Electronics</option>
                <option>Documents</option>
                <option>Bags</option>
                <option>Clothing</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="date">Date</label>
              <input
                id="date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              type="text"
              name="location"
              placeholder="Where was the item lost or found?"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Include distinctive features, colour, brand or other useful details."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="item-image">Item image <span>(optional)</span></label>
            <input
              id="item-image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button type="submit" className="submit-report">
            Submit report
          </button>
        </form>
      </section>
    </main>
  );
}

export default Report;

export function ReportRoute() {
  const { type } = useParams();
  return <Report key={type?.toLowerCase() || "lost"} />;
}
