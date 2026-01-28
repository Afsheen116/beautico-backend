const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

// --------------------
// Global Middlewares
// --------------------

// Security headers
app.use(helmet());

// Enable CORS
app.use(cors());

// Parse incoming JSON
app.use(express.json());

// --------------------
// Health Check Route
// --------------------
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Beautico API is running 🚀",
  });
});

module.exports = app;
