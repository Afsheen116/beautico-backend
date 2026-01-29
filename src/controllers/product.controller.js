const Product = require("../models/Product.model");

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Create product error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to create product",
    });
  }
};

// GET ALL PRODUCTS
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Get products error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};
