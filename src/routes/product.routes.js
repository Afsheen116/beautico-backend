const express = require("express");
const {
  createProduct,
  getAllProducts,
} = require("../controllers/product.controller");

const { protect } = require("../middlewares/auth.middleware");
const { adminOnly } = require("../middlewares/admin.middleware");

const router = express.Router();

// Public
router.get("/", getAllProducts);

// Admin only
router.post("/", protect, adminOnly, createProduct);

module.exports = router;

