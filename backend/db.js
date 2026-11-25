const mysql = require("mysql2");
const path = require("path");

// Load .env for local development
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

// Create a connection pool
// We use || (OR) to provide a fallback in case Render's environment variables fail
const pool = mysql.createPool({
  host: process.env.DB_HOST || "yamabiko.proxy.rlwy.net",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "ljYCnENCZfWAabxUOJApBvRALpPZtroY", // Your exact password
  database: process.env.DB_NAME || "railway",
  port: process.env.DB_PORT || 57252,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test the connection so we can see it in the Render logs
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Error connecting to the database:", err.message);
  } else {
    console.log("✅ Successfully connected to the MySQL database!");
    connection.release();
  }
});

// Export the pool for use in other files
module.exports = pool.promise();
