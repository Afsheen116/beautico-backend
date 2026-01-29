const Order = require("../models/Order.model");
const Cart = require("../models/Cart.model");
// PLACE ORDER (FROM CART)
exports.placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    // 1️⃣ Find user's cart
    const cart = await Cart.findOne({ user: userId }).populate(
      "items.product"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // 2️⃣ Prepare order items snapshot
    let totalAmount = 0;

    const orderItems = cart.items.map((item) => {
      const itemTotal = item.product.price * item.quantity;
      totalAmount += itemTotal;

      return {
        product: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      };
    });

    // 3️⃣ Create order
    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalAmount,
    });

    // 4️⃣ Clear cart after order
    cart.items = [];
    await cart.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Place order error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to place order",
    });
  }
};
// GET LOGGED-IN USER ORDERS
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get orders error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};
// GET LOGGED-IN USER ORDERS
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get orders error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};
