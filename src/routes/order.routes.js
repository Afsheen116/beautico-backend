const express = require("express");
const { protect } = require("../middlewares/auth.middleware");
const {
  placeOrder,
  getMyOrders,
} = require("../controllers/order.controller");

const router = express.Router();

router.post("/", protect, placeOrder);
router.get("/my-orders", protect, getMyOrders);

module.exports = router;
