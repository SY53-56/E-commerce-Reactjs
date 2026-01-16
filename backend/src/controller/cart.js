// controllers/cartController.js
const Cart = require("../models/cart");
const Product = require("../models/product");

// 🔹 Helper to populate cart safely
const populateCart = async (cart) => {
  if (!cart) return null;
  await cart.populate("items.product");
  return cart;
};

const addCart = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Please login" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }

    const index = cart.items.findIndex(
      i => i.product.toString() === productId.toString()
    );

    if (index > -1) {
      cart.items[index].quantity += 1;
    } else {
      cart.items.push({
        product: product._id,
        quantity: 1,
      });
    }

    await cart.populate("items.product");

    cart.totalAmount = cart.items.reduce(
      (sum, i) => sum + i.product.price * i.quantity,
      0
    );

    cart.finalAmount = cart.totalAmount;

    await cart.save();

    res.status(201).json({ success: true, data: cart });
  } catch (e) {
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

    const item = cart.items.find(i=>i.product._id.toString()=== productId.toString())
    if (!item) return res.status(404).json({ message: "Item not found in cart" });
   item.quantity += 1;
     await populateCart(cart);

 
    cart.totalAmount = cart.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    cart.finalAmount = cart.totalAmount;

    await cart.save();
   

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

    const item = cart.items.find(i=>i.product._id.toString()=== productId.toString())
    if (!item) return res.status(404).json({ message: "Item not found in cart" });

    if (item.quantity > 1) item.quantity -= 1;
await populateCart(cart);
    cart.totalAmount = cart.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    cart.finalAmount = cart.totalAmount;

    await cart.save();
    

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
  await populateCart(cart);
    cart.totalAmount = cart.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    cart.finalAmount = cart.totalAmount;

    await cart.save();
  

    res.status(200).json({ success: true, data: cart });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
const ApplyDiscount = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Please login" });
    }

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart || cart.items.length === 0) {
      return res
        .status(400)
        .json({ message: "Cart is empty, cannot apply discount" });
    }

    let discountNum = 0;

    if (cart.totalAmount <= 1000) {
      discountNum = 10;
    } else if (cart.totalAmount <= 2500) {
      discountNum = 15;
    } else {
      discountNum = 20;
    }

    cart.discount = discountNum;
    cart.discountAmount = (cart.totalAmount * discountNum) / 100;
    console.log("discount",cart.discountAmount)
    cart.finalAmount = cart.totalAmount - cart.discountAmount;
    cart.couponCode = `AUTO${discountNum}`;
console.log("TOTAL:", cart.totalAmount);
console.log("DISCOUNT:", cart.discountAmount);
console.log("FINAL:", cart.finalAmount);

    await cart.save();
    await populateCart(cart);

    res.status(200).json({
      success: true,
      message: "Discount applied successfully",
      data: cart,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
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
