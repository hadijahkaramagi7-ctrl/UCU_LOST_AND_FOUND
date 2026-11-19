const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Import Routes
const reportRoutes = require("./routes/report.routes");
const authRoutes = require("./routes/auth.routes");
const claimRoutes = require("./routes/claim.routes"); // <-- NEW

// Use Routes
app.use("/api/reports", reportRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/claims", claimRoutes); // <-- NEW

app.get("/api/health", (req, res) => {
  res.json({ message: "UCU Lost and Found API is running!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
