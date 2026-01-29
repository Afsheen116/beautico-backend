const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cartRoutes = require("./routes/cart.routes");

const authRoutes = require("./routes/auth.routes");
const { protect } = require("./middlewares/auth.middleware");
const productRoutes = require("./routes/product.routes");
const wishlistRoutes = require("./routes/wishlist.routes");

const app = express(); // ✅ app is created HERE

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
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);
app.use("/api/v1/cart", cartRoutes);
// --------------------
// TEMP PROTECTED TEST ROUTE (AFTER app exists)
// --------------------
app.get("/api/v1/protected-test", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "You accessed a protected route 🎉",
    user: {
      id: req.user._id,
      email: req.user.email,
      role: req.user.role,
    },
  });
});

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


