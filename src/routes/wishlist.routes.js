const express = require("express");
const { protect } = require("../middlewares/auth.middleware");
const {
  addToWishlist,
  getMyWishlist,
} = require("../controllers/wishlist.controller");

const router = express.Router();

router.post("/add", protect, addToWishlist);
router.get("/", protect, getMyWishlist);

module.exports = router;
