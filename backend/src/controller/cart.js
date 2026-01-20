const Cart = require("../models/cart");
const Product = require("../models/product");

/* =======================
   Helpers
======================= */

// Populate cart safely
const populateCart = async (cart) => {
  if (!cart) return null;
  await cart.populate("items.product");
  return cart;
};

// Calculate totals + auto discount
const calculateCartTotals = (cart) => {
  // Total
  cart.totalAmount = cart.items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  // Discount slabs
  let discountPercent = 0;
  if (cart.totalAmount < 500) discountPercent = 7;
  else if (cart.totalAmount < 2000) discountPercent = 12;
  else if (cart.totalAmount < 5000) discountPercent = 16;
  else discountPercent = 22;

  cart.discountPercent = discountPercent;
  cart.discountAmount = Math.round(
    (cart.totalAmount * discountPercent) / 100
  );

  cart.finalAmount = cart.totalAmount - cart.discountAmount;
};

/* =======================
   Controllers
======================= */

// ADD TO CART
const addCart = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!req.user) return res.status(401).json({ message: "Please login" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) cart = await Cart.create({ user: req.user.id, items: [] });

    const index = cart.items.findIndex(
      (i) => i.product.toString() === productId.toString()
    );

    if (index > -1) cart.items[index].quantity += 1;
    else cart.items.push({ product: product._id, quantity: 1 });

    await populateCart(cart);
    calculateCartTotals(cart);
    await cart.save();

    res.status(201).json({ success: true, data: cart });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// GET CART
const getCart = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Please login" });

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart)
      return res.status(200).json({ success: true, data: { items: [] } });

    await populateCart(cart);
    calculateCartTotals(cart);
    await cart.save();

    res.status(200).json({ success: true, data: cart });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// INCREASE QUANTITY
const increaseQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (i) => i.product._id.toString() === productId
    );
    if (!item)
      return res.status(404).json({ message: "Item not found in cart" });

    item.quantity += 1;

    await populateCart(cart);
    calculateCartTotals(cart);
    await cart.save();

    res.status(200).json({ success: true, data: cart });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// DECREASE QUANTITY
const decreaseQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (i) => i.product._id.toString() === productId
    );
    if (!item)
      return res.status(404).json({ message: "Item not found in cart" });

    if (item.quantity > 1) item.quantity -= 1;

    await populateCart(cart);
    calculateCartTotals(cart);
    await cart.save();

    res.status(200).json({ success: true, data: cart });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// REMOVE SINGLE ITEM
const removeSingleOrderItem = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { items: { product: productId } } },
      { new: true }
    );

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    await populateCart(cart);
    calculateCartTotals(cart);
    await cart.save();

    res.status(200).json({ success: true, data: cart });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

module.exports = {
  addCart,
  getCart,
  increaseQuantity,
  decreaseQuantity,
  removeSingleOrderItem,
};
