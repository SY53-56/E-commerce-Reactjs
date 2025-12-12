const CartModel= require("../models/cart");


// 1. Add product to cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    let cart = await CartModel.findOne({ user: userId });

    if (!cart) {
      cart = await CartModel.create({
        user: userId,
        item: [{ product: productId, quantity: 1 }],
      });
      return res.status(201).json({ message: "Cart created", cart });
    }

    const indexCart = cart.item.findIndex(
      (item) => item.product.toString() === productId
    );

    if (indexCart > -1) {
      cart.item[indexCart].quantity += 1;
    } else {
      cart.item.push({ product: productId, quantity: 1 });
    }

    await cart.save();
    res.status(200).json({ message: "Product added to cart", cart });

  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// 2. Get user cart
const getCartItem = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await CartModel.findOne({ user: userId })
      .populate("items.product");

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json({ items: cart.item });

  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// 3. Remove item from cart
const removeCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    let cart = await CartModel.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.item = cart.item.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    res.status(200).json({ message: "Item removed from cart", cart });

  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// 4. Update item quantity
const updateCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    const cart = await CartModel.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const index = cart.item.findIndex(
      (item) => item.product.toString() === productId
    );

    if (index === -1)
      return res.status(404).json({ message: "Product not in cart" });

    cart.item[index].quantity = quantity;

    await cart.save();
    res.status(200).json({ message: "Cart updated", cart });

  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = { addToCart, getCartItem, removeCartItem, updateCartItem };
