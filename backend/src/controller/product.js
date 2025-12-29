const Product = require("../models/product");

// 1️⃣ Get all products
const showProduct = async (req, res) => {
  try {
    const products = await Product.find().populate("userAdmin", "username email");
    console.log("prodducts",products)
    res.status(200).json({ products });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// 2️⃣ Get single product by ID
const showOneProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("userAdmin", "username email");

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ product });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// 3️⃣ Add new product
const addProduct = async (req, res) => {
  try {
    const { name, price, image, description, category,unit } = req.body;
  console.log("data ",req.body)
    if (!name || !price || !image || !description || !category || !unit ) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const product = await Product.create({
      name,
      price,
      image,
      description,
      category,
      unit,
      userAdmin: req.user.id // logged-in admin/user
    });

    await product.populate("userAdmin", "username email");

    res.status(201).json({ product });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// 4️⃣ Update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    }).populate("userAdmin", "username email");

    if (!updated) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ updated });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// 5️⃣ Delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: "Product not found" });

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
