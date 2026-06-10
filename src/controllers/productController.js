const Product = require("../models/Product");

// GET /api/products
const getProducts = async (req, res, next) => {
  try {
    const { category, minPrice, maxPrice, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const skip = (page - 1) * limit;
    const [products, total] = await Promise.all([
      Product.find(filter).skip(skip).limit(Number(limit)).sort({ createdAt: -1 }),
      Product.countDocuments(filter),
    ]);

    res.json({ success: true, total, page: Number(page), data: products });
  } catch (error) {
    next(error);
  }
};

// GET /api/products/:id
const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found." });
    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// POST /api/products
const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock, category } = req.body;
    if (!name || price === undefined || !category) {
      return res.status(400).json({ success: false, message: "Name, price, and category are required." });
    }

    const product = await Product.create({ name, description, price, stock, category });
    console.log(`[Products] Created: ${product.name} (${product._id})`);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// PUT /api/products/:id
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ success: false, message: "Product not found." });
    console.log(`[Products] Updated: ${product._id}`);
    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/products/:id
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found." });
    console.log(`[Products] Deleted: ${product._id}`);
    res.json({ success: true, message: "Product deleted." });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
