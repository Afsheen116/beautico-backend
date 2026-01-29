const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRoutes = require("./routes/auth.routes");

const app = express();

// --------------------
// Global Middlewares
// --------------------
app.use(helmet());
app.use(cors());
app.use(express.json());

// --------------------
// Routes
// --------------------
app.use("/api/v1/auth", authRoutes);

// --------------------
// Health Check
// --------------------
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Beautico API is running 🚀",
  });
});

module.exports = app;

