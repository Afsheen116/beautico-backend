const Wishlist = require("../models/Wishlist.model");

// ADD TO WISHLIST
exports.addToWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: userId,
        products: [productId],
      });
    } else {
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
        await wishlist.save();
      }
    }

    res.status(200).json({
      success: true,
      message: "Product added to wishlist",
      wishlist,
    });
  } catch (error) {
    console.error("Add to wishlist error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to add to wishlist",
    });
  }
};

// GET MY WISHLIST
exports.getMyWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id }).populate(
      "products"
    );

    res.status(200).json({
      success: true,
      wishlist: wishlist || { products: [] },
    });
  } catch (error) {
    console.error("Get wishlist error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch wishlist",
    });
  }
};
