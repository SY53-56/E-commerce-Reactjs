const Cart = require("../models/cart");
const Order = require("../models/order");


/* =======================
   CREATE ORDER
======================= */
const createOrder = async (req, res) => {
  const userId = req.user.id;
  const { address } = req.body;

  try {
    // ✅ Validate address
    if (!address || !address.city) {
      return res.status(400).json({
        success: false,
        message: "Address is required",
      });
    }

    // ✅ Get cart with product populated
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    //  Create order
    const newOrder = new Order({
      user: userId,
      items: cart.items,
      totalAmount:cart.totalAmount,
      discountAmount:cart.discountAmount,
      finalAmount: cart.finalAmount,
      address: address,
    });

    await newOrder.save();

    // Populate product data for frontend
    await newOrder.populate("items.product");

    //  Clear cart
    cart.items = [];
    cart.totalAmount = 0;
     cart.finalAmount= 0
    cart.discountAmount =0
    await cart.save();

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

/* =======================
   GET ALL ORDERS
======================= */
const getAllOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ user: userId })
      .populate("items.product")
      .sort({ createdAt: -1 }); // latest first

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

/* =======================
   GET SINGLE ORDER
======================= */
const getSingleOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const order = await Order.findById(orderId).populate("items.product");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

/* =======================
   UPDATE ORDER STATUS (ADMIN)
======================= */
const getOrderStatus = async (req, res) => {
  try {
    const {status } = req.body;
    const orderId = req.params.id;

     if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const validStatus = ["placed", "shipped", "delivered"];

    if (!validStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }
    if(order.status ===  "delivered"){
             return res.status(400).json({
        success: false,
        message: "Order already delivered. Cannot update.",
      });

    }

    order.status = status;
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findOne({
      _id: orderId,
      user: req.user.id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Only allow delete if delivered
    if (order.status !== "delivered") {
      return res.status(400).json({
        success: false,
        message: "Only delivered orders can be deleted",
      });
    }

    await order.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createOrder,
  getAllOrder,
  getSingleOrder,
  getOrderStatus,
};