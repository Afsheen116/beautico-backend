const Cart = require("../models/Cart.model");

// ADD TO CART
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity = 1 } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }

      await cart.save();
    }

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    console.error("Add to cart error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to add product to cart",
    });
  }
};

// GET MY CART
exports.getMyCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate("items.product");

    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: {
          items: [],
          totalAmount: 0,
        },
      });
    }

    let totalAmount = 0;

    const items = cart.items.map((item) => {
      const unitPrice = item.product.price;
      const quantity = item.quantity;
      const itemTotal = unitPrice * quantity;

      totalAmount += itemTotal;

      return {
        productId: item.product._id,
        name: item.product.name,
        unitPrice,
        quantity,
        itemTotal,
      };
    });

    res.status(200).json({
      success: true,
      cart: {
        items,
        totalAmount,
      },
    });
  } catch (error) {
    console.error("Get cart error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
    });
  }
};
// UPDATE CART ITEM QUANTITY
exports.updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Product not in cart",
      });
    }

    item.quantity = quantity;
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
    });
  } catch (error) {
    console.error("Update cart error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update cart",
    });
  }
};
// REMOVE ITEM FROM CART
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product removed from cart",
    });
  } catch (error) {
    console.error("Remove cart item error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to remove item",
    });
  }
};

