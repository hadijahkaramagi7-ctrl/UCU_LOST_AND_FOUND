const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'UCU_LOST_AND_FOUND',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the connection clearly
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Error connecting to the database:', err.message);
    } else {
        console.log('✅ Successfully connected to the MySQL database!');
        connection.release();
    }
    process.exit(0); // This forces the script to stop running after testing
});

module.exports = pool.promise();