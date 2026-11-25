import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

function Admin() {
  const [claims, setClaims] = useState([]);
  const [reasons, setReasons] = useState({});

  const loadClaims = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/claims");
      setClaims(response.data);
    } catch (error) {
      console.error("Error loading claims:", error);
    }
  };

  useEffect(() => {
    loadClaims();
  }, []);

  const updateClaim = async (id, status) => {
    const reason = reasons[id]?.trim();

    if (!reason) {
      alert("Please record the reason for this decision.");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/claims/${id}`, {
        status: status.toLowerCase(),
        admin_reason: reason,
      });

      alert(`Claim ${status.toLowerCase()} successfully.`);
      loadClaims();
    } catch (error) {
      console.error("Error updating claim:", error);
      alert("Failed to update claim in database.");
    }
  };

  const pendingClaims = claims.filter((claim) => claim.status === "pending");
  const approvedClaims = claims.filter((claim) => claim.status === "approved");
  const rejectedClaims = claims.filter((claim) => claim.status === "rejected");

  return (
    <main className="admin-page">
      <section className="admin-shell" aria-labelledby="admin-title">
        <header className="admin-header">
          <div>
            <p className="admin-eyebrow">UCU Campus Services</p>
            <h1 id="admin-title">Ownership Claims Administration</h1>
            <p className="admin-intro">
              Review submitted claims and document each final decision.
            </p>
          </div>
        </header>

        <div className="admin-summary" aria-label="Claim summary">
          <div className="summary-card">
            <span>Total claims</span>
            <strong>{claims.length}</strong>
          </div>
          <div className="summary-card">
            <span>Pending review</span>
            <strong>{pendingClaims.length}</strong>
          </div>
          <div className="summary-card">
            <span>Approved</span>
            <strong>{approvedClaims.length}</strong>
          </div>
          <div className="summary-card">
            <span>Rejected</span>
            <strong>{rejectedClaims.length}</strong>
          </div>
        </div>

        <section className="claims-section" aria-labelledby="claims-title">
          <div className="claims-heading">
            <h2 id="claims-title">Submitted Claims</h2>
            <span>
              {claims.length} {claims.length === 1 ? "record" : "records"}
            </span>
          </div>

          {claims.length === 0 ? (
            <div className="claims-empty">
              <h3>No claims to review</h3>
              <p>Submitted ownership claims will appear here.</p>
            </div>
          ) : (
            <div className="claims-table-wrap" style={{ overflowX: "auto" }}>
              {/* Inline styles added to force the table to fit the screen */}
              <table
                className="claims-table"
                style={{ width: "100%", tableLayout: "fixed" }}
              >
                <thead>
                  <tr>
                    <th scope="col" style={{ width: "15%" }}>
                      Item
                    </th>
                    <th scope="col" style={{ width: "15%" }}>
                      Student
                    </th>
                    <th scope="col" style={{ width: "20%" }}>
                      Evidence
                    </th>
                    <th scope="col" style={{ width: "10%" }}>
                      Status
                    </th>
                    <th scope="col" style={{ width: "20%" }}>
                      Reason
                    </th>
                    <th scope="col" style={{ width: "20%" }}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {claims.map((claim) => (
                    <tr key={claim.id}>
                      <td style={{ wordWrap: "break-word" }}>
                        <strong>{claim.item_title}</strong>
                        <br />
                        <small>ID: {claim.report_id}</small>
                      </td>
                      <td style={{ wordWrap: "break-word" }}>
                        {claim.claimant_email}
                      </td>
                      <td style={{ wordWrap: "break-word" }}>
                        {claim.evidence}
                      </td>
                      <td>
                        <span className={`claim-status ${claim.status}`}>
                          {claim.status}
                        </span>
                      </td>
                      <td>
                        {claim.status === "pending" ? (
                          <textarea
                            className="decision-input"
                            rows="2"
                            style={{ width: "100%", padding: "5px" }}
                            value={reasons[claim.id] || ""}
                            onChange={(e) =>
                              setReasons({
                                ...reasons,
                                [claim.id]: e.target.value,
                              })
                            }
                            placeholder="Enter reason..."
                          />
                        ) : (
                          <span
                            style={{ wordWrap: "break-word", display: "block" }}
                          >
                            {claim.admin_reason || "No reason"}
                          </span>
                        )}
                      </td>
                      <td>
                        {claim.status === "pending" ? (
                          <div
                            style={{
                              display: "flex",
                              gap: "5px",
                              flexDirection: "column",
                            }}
                          >
                            <button
                              type="button"
                              onClick={() => updateClaim(claim.id, "Approved")}
                              style={{
                                backgroundColor: "#28a745",
                                color: "white",
                                padding: "8px",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontWeight: "bold",
                              }}
                            >
                              Approve
                            </button>
                            <button
                              type="button"
                              onClick={() => updateClaim(claim.id, "Rejected")}
                              style={{
                                backgroundColor: "#dc3545",
                                color: "white",
                                padding: "8px",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontWeight: "bold",
                              }}
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span style={{ color: "green", fontWeight: "bold" }}>
                            Decision recorded
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

export default Admin;
