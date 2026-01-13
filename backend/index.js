require("dotenv").config();          // Load variables from .env
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");  // Import db.js for MongoDB connection
const authRoutes = require("./routes/authRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Auth routes
app.use("/api", authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
