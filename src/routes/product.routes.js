const express = require("express");
const {
  createProduct,
  getAllProducts,
} = require("../controllers/product.controller");

const router = express.Router();

// PUBLIC
router.get("/", getAllProducts);

// ADMIN (we’ll protect later)
router.post("/", createProduct);

module.exports = router;
