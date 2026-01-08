// controllers/cartController.js
const Cart = require("../models/cart");
const Product = require("../models/product");

// 🔹 Helper to populate cart safely
const populateCart = async (cart) => {
  if (!cart) return null;
  await cart.populate("items.product");
  return cart;
};

// 1️⃣ Add to Cart
const addCart = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!req.user) return res.status(401).json({ message: "Please login" });
    if (!productId) return res.status(400).json({ message: "Invalid productId" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [], totalAmount: 0, status: "pending" });
    }

    // ✅ Find item in cart
    const index = cart.items.findIndex(i =>
      (typeof i.product === "object" && i.product._id) ?
        i.product._id.toString() === productId :
        i.product.toString() === productId
    );

    if (index > -1) {
      cart.items[index].quantity += 1;
    } else {
      cart.items.push({
        product: product._id,
        name: product.title || product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }

    // Recalculate totals
    cart.totalAmount = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    cart.finalAmount = cart.totalAmount;

    await cart.save();
    await populateCart(cart);

    res.status(201).json({ success: true, message: "Product added to cart", data: cart });
  } catch (e) {
    console.error("AddCartError:", e);
    res.status(500).json({ message: e.message });
  }
};

// 2️⃣ Get Cart
const getCart = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Please login" });

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(200).json({ success: true, data: { items: [] } });

    await populateCart(cart);
    res.status(200).json({ success: true, data: cart });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// 3️⃣ Increase Quantity
const increaseQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(i =>
      (typeof i.product === "object" && i.product._id) ?
        i.product._id.toString() === productId :
        i.product.toString() === productId
    );
    if (!item) return res.status(404).json({ message: "Item not found in cart" });

    item.quantity += 1;
    cart.totalAmount = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    cart.finalAmount = cart.totalAmount;

    await cart.save();
    await populateCart(cart);

    res.status(200).json({ success: true, data: cart });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// 4️⃣ Decrease Quantity
const decreaseQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(i =>
      (typeof i.product === "object" && i.product._id) ?
        i.product._id.toString() === productId :
        i.product.toString() === productId
    );
    if (!item) return res.status(404).json({ message: "Item not found in cart" });

    if (item.quantity > 1) item.quantity -= 1;

    cart.totalAmount = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    cart.finalAmount = cart.totalAmount;

    await cart.save();
    await populateCart(cart);

    res.status(200).json({ success: true, data: cart });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// 5️⃣ Remove Single Item
const removeSingleOrderItem = async (req, res) => {
  try {
    const { productId } = req.params;
    let cart = await Cart.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { items: { product: productId } } },
      { new: true }
    );
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.totalAmount = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    cart.finalAmount = cart.totalAmount;

    await cart.save();
    await populateCart(cart);

    res.status(200).json({ success: true, data: cart });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// 6️⃣ Apply Discount
const ApplyDiscount = async (req, res) => {
  try {
    const { discountCode } = req.body;
    if (!req.user) return res.status(401).json({ message: "Please login" });

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Cart is empty, cannot apply discount" });

    let discountNum = 0;
    switch (discountCode) {
      case "SAVE123": discountNum = 10; break;
      case "SAHUL25": discountNum = 20; break;
      case "PRODUCT25": discountNum = 30; break;
      default: return res.status(400).json({ message: "Invalid coupon" });
    }

    cart.discount = discountNum;
    cart.discountAmount = (cart.totalAmount * discountNum) / 100;
    cart.finalAmount = cart.totalAmount - cart.discountAmount;
    cart.couponCode = discountCode;

    await cart.save();
    await populateCart(cart);

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
  ApplyDiscount,
};
