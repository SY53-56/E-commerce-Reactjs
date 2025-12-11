const Product = require("../models/product");

// Get all products
const showProduct = async (req, res) => {
  try {
    const products = await Product.find().populate("User");
    res.status(200).json({ products });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Get single product
const showOneProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("User");

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ product });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Add product
const addProduct = async (req, res) => {
  try {
    const { name, price, image, description, category } = req.body;

    if (!name || !price || !image || !description || !category) {
      return res.status(400).json({ message: "Fill all fields" });
    }

    const product = await Product.create({
      name,
      price,
      image,
      description,
      category,
      User: req.user?._id, // if you track product owner
    });

    // populate after creation
    await product.populate("User");

    res.status(201).json({ product });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).populate("User");

    if (!updated)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ updated });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  showProduct,
  showOneProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
