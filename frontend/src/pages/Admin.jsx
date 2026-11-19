
import React, { useEffect, useState } from 'react';
import './Admin.css';

function Admin() {
  const [claims, setClaims] = useState([]);
  const [reasons, setReasons] = useState({});

  const loadClaims = () => {
    try {
      const savedClaims = JSON.parse(
        localStorage.getItem('ucuClaims') || '[]'
      );
      setClaims(Array.isArray(savedClaims) ? savedClaims : []);
    } catch {
      setClaims([]);
    }
  };

  useEffect(() => {
    loadClaims();
  }, []);

  const updateClaim = (id, status) => {
    const reason = reasons[id]?.trim();

    if (!reason) {
      alert('Please record the reason for this decision.');
      return;
    }

    let savedClaims = [];
    try {
      const parsedClaims = JSON.parse(
        localStorage.getItem('ucuClaims') || '[]'
      );
      savedClaims = Array.isArray(parsedClaims) ? parsedClaims : [];
    } catch {
      savedClaims = [];
    }

    const selectedClaim = savedClaims.find(
      claim => claim.id === id
    );

    if (!selectedClaim) return;

    if (status === 'Approved') {
      const anotherApprovedClaim = savedClaims.some(
        claim =>
          claim.itemId === selectedClaim.itemId &&
          claim.status === 'Approved' &&
          claim.id !== id
      );

      if (anotherApprovedClaim) {
        alert('Another claim for this item has already been approved.');
        return;
      }
    }

    const updatedClaims = savedClaims.map(claim =>
      claim.id === id
        ? { ...claim, status, adminReason: reason }
        : claim
    );

    localStorage.setItem(
      'ucuClaims',
      JSON.stringify(updatedClaims)
    );

    setClaims(updatedClaims);

    alert(`Claim ${status.toLowerCase()} successfully.`);
  };

  const pendingClaims = claims.filter(
    claim => claim.status === 'Pending'
  );
  const approvedClaims = claims.filter(
    claim => claim.status === 'Approved'
  );
  const rejectedClaims = claims.filter(
    claim => claim.status === 'Rejected'
  );

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
              {claims.length} {claims.length === 1 ? 'record' : 'records'}
            </span>
          </div>

          {claims.length === 0 ? (
            <div className="claims-empty">
              <h3>No claims to review</h3>
              <p>Submitted ownership claims will appear here.</p>
            </div>
          ) : (
            <div className="claims-table-wrap">
              <table className="claims-table">
                <thead>
                  <tr>
                    <th scope="col">Item</th>
                    <th scope="col">Student</th>
                    <th scope="col">Ownership evidence</th>
                    <th scope="col">Status</th>
                    <th scope="col">Decision reason</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {claims.map((claim) => (
                    <tr key={claim.id}>
                      <td>
                        <strong>{claim.itemName}</strong>
                        <span className="item-id">Item ID: {claim.itemId}</span>
                      </td>
                      <td>{claim.studentEmail}</td>
                      <td className="evidence-cell">{claim.evidence}</td>
                      <td>
                        <span className={`claim-status ${claim.status.toLowerCase()}`}>
                          {claim.status}
                        </span>
                      </td>
                      <td>
                        {claim.status === 'Pending' ? (
                          <textarea
                            className="decision-input"
                            rows="3"
                            value={reasons[claim.id] || ''}
                            onChange={(e) =>
                              setReasons({
                                ...reasons,
                                [claim.id]: e.target.value
                              })
                            }
                            placeholder="Enter the reason for this decision"
                            aria-label={`Decision reason for ${claim.itemName}`}
                          />
                        ) : (
                          <span className="recorded-reason">
                            {claim.adminReason || 'No reason recorded'}
                          </span>
                        )}
                      </td>
                      <td>
                        {claim.status === 'Pending' ? (
                          <div className="claim-actions">
                            <button
                              type="button"
                              className="action-button approve"
                              onClick={() =>
                                updateClaim(claim.id, 'Approved')
                              }
                            >
                              Approve
                            </button>
                            <button
                              type="button"
                              className="action-button reject"
                              onClick={() =>
                                updateClaim(claim.id, 'Rejected')
                              }
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="decision-complete">Decision recorded</span>
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