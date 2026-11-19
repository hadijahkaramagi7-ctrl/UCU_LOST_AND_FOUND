const express = require("express");
const router = express.Router();
const pool = require("../db");

// 1. POST: Submit a claim for a found item
router.post("/", async (req, res) => {
  try {
    const { report_id, claimant_id, evidence } = req.body;

    if (!report_id || !claimant_id || !evidence) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields." });
    }

    // Check if the report exists and is a 'found' item
    const [reports] = await pool.query("SELECT * FROM reports WHERE id = ?", [
      report_id,
    ]);
    if (reports.length === 0) {
      return res.status(404).json({ error: "Report not found." });
    }

    // Prevent users from claiming their own found items
    if (reports[0].user_id === claimant_id) {
      return res
        .status(400)
        .json({ error: "You cannot claim an item you reported as found." });
    }

    const [result] = await pool.query(
      "INSERT INTO claims (report_id, claimant_id, evidence) VALUES (?, ?, ?)",
      [report_id, claimant_id, evidence],
    );

    res.status(201).json({
      message: "Claim submitted successfully!",
      claimId: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while submitting claim." });
  }
});

// 2. GET: Admin fetches all pending claims
router.get("/", async (req, res) => {
  try {
    // We JOIN the tables to get the item title and the claimant's name
    const query = `
      SELECT c.id, c.evidence, c.status, c.created_at,
             r.title AS item_title, r.private_details,
             u.name AS claimant_name, u.email AS claimant_email
      FROM claims c
      JOIN reports r ON c.report_id = r.id
      JOIN users u ON c.claimant_id = u.id
      WHERE c.status = 'pending'
      ORDER BY c.created_at DESC
    `;
    const [claims] = await pool.query(query);
    res.json(claims);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while fetching claims." });
  }
});

// 3. PUT: Admin approves or rejects a claim
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body; // 'approved' or 'rejected'

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status." });
    }

    const [result] = await pool.query(
      "UPDATE claims SET status = ? WHERE id = ?",
      [status, req.params.id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Claim not found." });
    }

    // If approved, you could also update the report status to 'claimed' here
    res.json({ message: `Claim ${status} successfully!` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while updating claim." });
  }
});

module.exports = router;
