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
    // 1️⃣ Read query params
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    // 2️⃣ Calculate skip
    const skip = (page - 1) * limit;

    // 3️⃣ Get total products count
    const totalProducts = await Product.countDocuments({ isActive: true });

    // 4️⃣ Fetch paginated products
    const products = await Product.find({ isActive: true })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    // 5️⃣ Send response
    res.status(200).json({
      success: true,
      page,
      limit,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
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

