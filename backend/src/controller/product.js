const Product = require("../models/product");
const uploadBufferToCloudinary = require("../utility/uploadBufferToCloudinary");

// 1️⃣ Get all products
const showProduct = async (req, res) => {
  try {
   const page = Number(req.query.page)|| 1
   const limit = Number(req.query.limit)||20
 const skip= (page-1)*limit
 const [product ,total] = await Promise.all([
  Product.find().skip(skip).limit(limit).populate("userAdmin", "username email").select("-__v").lean() , 
  Product.countDocuments()
 ])

    res.status(200).json({ products:product, page , totalProduct:total, totalPages: Math.ceil(total/limit) });
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
    const { name, price, description, category,unit } = req.body;
  console.log("data ",req.body)
    if (!name || !price  || !description || !category || !unit ) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const files=req.files || []
    const uploads = []
    for(let f of files){
  const result = await uploadBufferToCloudinary(f.buffer)
  uploads.push(result.secure_url )
    }
  

    const product = await Product.create({
      name,
      price,
      image:uploads,
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
