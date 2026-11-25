const mysql = require("mysql2");
require("dotenv").config();

// Create a connection pool using the environment variables from Render
const pool = mysql.createPool({
  host: process.env.DB_HOST, // This will be yamabiko.proxy.rlwy.net
  user: process.env.DB_USER, // This will be root
  password: process.env.DB_PASSWORD, // This will be your Railway password
  database: process.env.DB_NAME, // This will be railway
  port: process.env.DB_PORT || 3306, // This will be 57252
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
