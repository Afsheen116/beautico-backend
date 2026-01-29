const express = require("express");
const { protect } = require("../middlewares/auth.middleware");
const {
  addToCart,
  getMyCart,
  updateCartItem,
  removeFromCart,
} = require("../controllers/cart.controller");

const router = express.Router();

router.post("/add", protect, addToCart);
router.get("/", protect, getMyCart);
router.put("/update", protect, updateCartItem);
router.delete("/remove", protect, removeFromCart);

module.exports = router;
