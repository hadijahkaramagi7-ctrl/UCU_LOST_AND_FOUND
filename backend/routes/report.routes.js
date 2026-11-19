const express = require("express");
const router = express.Router();
const pool = require("../db");
// Note: We will add auth middleware later, but for now, we use a fake user_id for testing.

// 1. POST: Create a new report (lost or found)
router.post("/", async (req, res) => {
  try {
    const {
      type,
      title,
      category,
      public_description,
      private_details,
      location,
      event_date,
    } = req.body;
    const user_id = 1;

    // Validate required fields
    if (
      !type ||
      !title ||
      !category ||
      !public_description ||
      !location ||
      !event_date
    ) {
      return res
        .status(400)
        .json({ error: "Please fill in all required fields." });
    }

    const [result] = await pool.query(
      `INSERT INTO reports (user_id, type, title, category, public_description, private_details, location, event_date) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        type,
        title,
        category,
        public_description,
        private_details || null,
        location,
        event_date,
      ],
    );

    res.status(201).json({
      message: "Report created successfully",
      reportId: result.insertId,
    });
  } catch (error) {
    console.error("CREATE REPORT ERROR:", error);
    return res
      .status(500)
      .json({
        error: error.message,
        code: error.code,
        sqlMessage: error.sqlMessage,
      });
  }
});

// 2. GET: Search and filter reports (HIDES PRIVATE DETAILS!)
router.get("/", async (req, res) => {
  try {
    const { search, type, location } = req.query;

    // We specifically select ONLY the public columns. We DO NOT select private_details.
    let query = `SELECT id, user_id, type, title, category, public_description, location, event_date, status, created_at FROM reports WHERE 1=1`;
    const params = [];

    if (search) {
      query += ` AND (title LIKE ? OR public_description LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`);
    }
    if (type) {
      query += ` AND type = ?`;
      params.push(type);
    }
    if (location) {
      query += ` AND location LIKE ?`;
      params.push(`%${location}%`);
    }

    query += ` ORDER BY created_at DESC`;

    const [reports] = await pool.query(query, params);
    res.json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while fetching reports." });
  }
});

// 3. GET: Get a single report by ID (HIDES PRIVATE DETAILS!)
router.get("/:id", async (req, res) => {
  try {
    const [reports] = await pool.query(
      `SELECT id, user_id, type, title, category, public_description, location, event_date, status, created_at FROM reports WHERE id = ?`,
      [req.params.id],
    );

    if (reports.length === 0) {
      return res.status(404).json({ error: "Report not found." });
    }

    res.json(reports[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while fetching report." });
  }
});

module.exports = router;
