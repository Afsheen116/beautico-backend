const express = require("express");
const { protect } = require("../middlewares/auth.middleware");
const { adminOnly } = require("../middlewares/admin.middleware");
const {
  placeOrder,
  getMyOrders,
  updateOrderStatus,
} = require("../controllers/order.controller");

const router = express.Router();



router.post("/", protect, placeOrder);
router.get("/my-orders", protect, getMyOrders);
router.patch("/:id/status", protect, adminOnly, updateOrderStatus);

module.exports = router;




