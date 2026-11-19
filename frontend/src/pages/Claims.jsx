
import React, { useState, useEffect } from 'react';
import './Claims.css';

function Claims() {
  const [itemId, setItemId] = useState('');
  const [itemName, setItemName] = useState('');
  const [evidence, setEvidence] = useState('');
  const [claims, setClaims] = useState([]);

  const studentEmail =
    localStorage.getItem('userEmail') || 'student@ucu.ac.ug';

  useEffect(() => {
    try {
      const savedClaims = JSON.parse(
        localStorage.getItem('ucuClaims') || '[]'
      );
      setClaims((Array.isArray(savedClaims) ? savedClaims : []).filter(
        claim => claim.studentEmail === studentEmail
      ));
    } catch {
      setClaims([]);
    }
  }, [studentEmail]);

  const submitClaim = (e) => {
    e.preventDefault();

    const newClaim = {
      id: Date.now(),
      itemId,
      itemName,
      evidence,
      studentEmail,
      status: 'Pending',
      adminReason: '',
      date: new Date().toLocaleDateString()
    };

    let allClaims = [];
    try {
      const savedClaims = JSON.parse(
        localStorage.getItem('ucuClaims') || '[]'
      );
      allClaims = Array.isArray(savedClaims) ? savedClaims : [];
    } catch {
      allClaims = [];
    }

    const updatedClaims = [...allClaims, newClaim];

    localStorage.setItem(
      'ucuClaims',
      JSON.stringify(updatedClaims)
    );

    setClaims(updatedClaims.filter(
      claim => claim.studentEmail === studentEmail
    ));

    setItemId('');
    setItemName('');
    setEvidence('');

    alert('Your claim has been submitted successfully!');
  };

  return (
    <main className="claims-page">
      <section className="claims-shell" aria-labelledby="claims-page-title">
        <header className="claims-header">
          <p className="claims-eyebrow">UCU Campus Services</p>
          <h1 id="claims-page-title">Ownership Claims</h1>
          <p>
            Submit a claim for an item recorded as found and track the status
            of its administrative review.
          </p>
        </header>

        <div className="claims-layout">
          <section className="claim-form-panel" aria-labelledby="claim-form-title">
            <h2 id="claim-form-title">Submit an Ownership Claim</h2>
            <p className="panel-intro">
              Provide specific information that will assist the reviewing team
              in verifying ownership.
            </p>

            <form onSubmit={submitClaim} className="claim-form">
              <div className="claim-field">
                <label htmlFor="claim-item-id">Item ID</label>
                <input
                  id="claim-item-id"
                  type="text"
                  value={itemId}
                  onChange={(e) => setItemId(e.target.value)}
                  placeholder="Enter the item ID"
                  required
                />
              </div>

              <div className="claim-field">
                <label htmlFor="claim-item-name">Item Name</label>
                <input
                  id="claim-item-name"
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="Enter item name"
                  required
                />
              </div>

              <div className="claim-field">
                <label htmlFor="claim-evidence">
                  Ownership Evidence <span>(Private)</span>
                </label>
                <textarea
                  id="claim-evidence"
                  rows="5"
                  value={evidence}
                  onChange={(e) => setEvidence(e.target.value)}
                  placeholder="Describe identifying features or circumstances that establish ownership"
                  required
                />
              </div>

              <button type="submit" className="submit-claim">
                Submit Claim
              </button>
            </form>
          </section>

          <section className="submitted-panel" aria-labelledby="submitted-title">
            <div className="submitted-heading">
              <h2 id="submitted-title">Submitted Claims</h2>
              <span>
                {claims.length} {claims.length === 1 ? 'record' : 'records'}
              </span>
            </div>

            {claims.length === 0 ? (
              <div className="claims-empty">
                <h3>No claims submitted</h3>
                <p>Your submitted ownership claims will appear here.</p>
              </div>
            ) : (
              <div className="submitted-table-wrap">
                <table className="submitted-table">
                  <thead>
                    <tr>
                      <th scope="col">Item</th>
                      <th scope="col">Date</th>
                      <th scope="col">Status</th>
                      <th scope="col">Administrative Response</th>
                    </tr>
                  </thead>
                  <tbody>
                    {claims.map((claim) => (
                      <tr key={claim.id}>
                        <td><strong>{claim.itemName}</strong></td>
                        <td>{claim.date}</td>
                        <td>
                          <span className={`claim-status ${String(claim.status).toLowerCase()}`}>
                            {claim.status}
                          </span>
                        </td>
                        <td>{claim.adminReason || 'Awaiting review'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}

export default Claims;