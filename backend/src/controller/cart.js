const Cart = require("../models/cart");
const Product = require("../models/product");

/* =======================
   HELPER: CALCULATE TOTALS
======================= */
const calculateCartTotals = (cart) => {
  cart.totalAmount = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  let discount = 0;

  if (cart.totalAmount > 5000) discount = 20;
  else if (cart.totalAmount > 2000) discount = 15;
  else if (cart.totalAmount > 500) discount = 10;

  const autoDiscount = Math.round((cart.totalAmount * discount) / 100);
  const couponDiscount = cart.coupon?.discount || 0;

  cart.discountAmount = autoDiscount + couponDiscount;
  cart.finalAmount = cart.totalAmount - cart.discountAmount;
};

/* =======================
   ADD TO CART


======================= */


const addCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        items: [],
      });
    }

    const index = cart.items.findIndex(
      (i) => i.product.toString() === productId
    );

    if (index > -1) {
      cart.items[index].quantity += 1;
    } else {
      cart.items.push({
        product: product._id,
        quantity: 1,
        price: product.price, // 🔥 snapshot
      });
    }

    calculateCartTotals(cart);
    await cart.save();
    await cart.populate("items.product");

    res.status(200).json({ success: true, data: cart });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

/* =======================
   GET CART
======================= */
const getCart = async (req, res) => {
  try {
  
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(200).json({
        success: true,
        data: {
          items: [],
          totalAmount: 0,
          discountAmount: 0,
          finalAmount: 0,
        },
      });
    }

    calculateCartTotals(cart);
    await cart.save();
    await cart.populate("items.product");

    res.status(200).json({ success: true, data: cart });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

/* =======================
   INCREASE QUANTITY
======================= */
const increaseQuantity = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (i) => i.product.toString() === productId
    );

    if (!item)
      return res.status(404).json({ message: "Item not found" });

    item.quantity += 1;

    calculateCartTotals(cart);
    await cart.save();
    await cart.populate("items.product");

    res.json({ success: true, data: cart });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

/* =======================
   DECREASE QUANTITY
======================= */
const decreaseQuantity = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (i) => i.product.toString() === productId
    );

    if (!item)
      return res.status(404).json({ message: "Item not found" });

    if (item.quantity > 1) item.quantity -= 1;

    calculateCartTotals(cart);
    await cart.save();
    await cart.populate("items.product");

    res.json({ success: true, data: cart });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

/* =======================
   REMOVE ITEM
======================= */
const removeSingleOrderItem = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (i) => i.product.toString() !== productId
    );

    calculateCartTotals(cart);
    await cart.save();
    await cart.populate("items.product");

    res.json({ success: true, data: cart });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

/* =======================
   APPLY COUPON
======================= */
const applyCoupon = async (req, res) => {
  try {
    const { code } = req.body;

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    if (code === "SAVE10") {
      cart.coupon = { code, discount: 100 };
    } else {
      return res.status(400).json({ message: "Invalid coupon" });
    }

    calculateCartTotals(cart);
    await cart.save();

    res.json({ success: true, data: cart });
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
  applyCoupon,

};