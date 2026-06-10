const Order = require("../models/Order");
const Product = require("../models/Product");

// GET /api/orders
const getOrders = async (req, res, next) => {
  try {
    // Admins see all orders; users see only their own
    const filter = req.user.role === "admin" ? {} : { userId: req.user._id };
    const orders = await Order.find(filter)
      .populate("userId", "name email")
      .populate("productId", "name price")
      .sort({ createdAt: -1 });

    res.json({ success: true, total: orders.length, data: orders });
  } catch (error) {
    next(error);
  }
};

// GET /api/orders/:id
const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId", "name email")
      .populate("productId", "name price");

    if (!order) return res.status(404).json({ success: false, message: "Order not found." });

    // Non-admins can only view their own orders
    if (req.user.role !== "admin" && order.userId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Access denied." });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// POST /api/orders
const createOrder = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      return res.status(400).json({ success: false, message: "productId and quantity are required." });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found." });
    if (product.stock < quantity) {
      return res.status(400).json({ success: false, message: `Insufficient stock. Available: ${product.stock}` });
    }

    const totalPrice = product.price * quantity;
    const order = await Order.create({ userId: req.user._id, productId, quantity, totalPrice });

    // Deduct stock
    await Product.findByIdAndUpdate(productId, { $inc: { stock: -quantity } });

    console.log(`[Orders] New order: ${order._id} by user ${req.user.email} | Total: $${totalPrice}`);
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// PUT /api/orders/:id
const updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!order) return res.status(404).json({ success: false, message: "Order not found." });
    console.log(`[Orders] Updated order: ${order._id} → status: ${order.status}`);
    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/orders/:id
const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: "Order not found." });
    res.json({ success: true, message: "Order deleted." });
  } catch (error) {
    next(error);
  }
};

module.exports = { getOrders, getOrder, createOrder, updateOrder, deleteOrder };
