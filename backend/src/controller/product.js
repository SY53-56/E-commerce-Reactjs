const { cloudinary_js_config } = require("../config/cloudinaryConfig");

const Product = require("../models/product");
const uploadBufferToCloudinary = require("../utility/uploadBufferToCloudinary");

// 1️⃣ Get all products
const showProduct = async (req, res) => {
  try {
   const page = Number(req.query.page)|| 1
   const limit = Number(req.query.limit)||20
 const skip= (page-1)*limit

 const {category, search ,maxPrice, minPrice}= req.query
 
  let filter= {}
 
  if(search){
    filter.name = { $regex: search, $options: "i" };
  }
  if(category){
    filter.category = category.toLowerCase()
  }

 if (minPrice || maxPrice) {
  filter.price = {};

  if (minPrice) filter.price.$gte = Number(minPrice);
  if (maxPrice) filter.price.$lte = Number(maxPrice);
}

 const [product ,total] = await Promise.all([
  Product.find(filter).skip(skip).limit(limit).populate("userAdmin", "username email").select("-__v").lean() , 
  Product.countDocuments(filter)
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
    const { name, price, description, category,unit,brand,stock } = req.body;
  console.log("data ",req.body)
    if (!name || !price  || !description || !category || !unit|| !brand ||      stock === undefined ) {
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
     brand,
     stock,
    
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

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const files = req.files || [];
    let images = req.body.existingImages || product.image;

    // Ensure array
    if (typeof images === "string") {
      images = [images];
    }

    // Upload new images
    if (files.length > 0) {
      for (const file of files) {
        const result = await uploadBufferToCloudinary(file.buffer);
        images.push(result.secure_url);
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        category: req.body.category,
        unit: req.body.unit,
        description: req.body.description,
        brand: req.body.brand,
        image: images
      },
      { new: true, runValidators: true }
    ).populate("userAdmin", "_id username email");

    res.status(200).json({ product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

const reviewProduct = async(req,res)=>{
  try{
    const {comment, rating} = req.body
    let userId = req.user.id
    if(!userId) return res.status(300).json({message:"first login the website"})

        const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
      product.reviews.push({
        user:userId,
        rating:rating,
        comment:comment
      })

      res.status(200).json({product})

  }catch(e){
        res.status(500).json({ message: e.message });
  }
}
const deleteReview = async(req,res)=>{
  try{
    const {productId , reviewId} = req.params
            
     const product = await Product.findById(productId)
     
    

    const reviewIndex = product.reviews.findIndex(
      (r) => r._id.toString() === reviewId
    );
  
   const review = product.reviews[reviewIndex]     
   if (
      review.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }
   
      product.reviews.splice(reviewIndex,1)
      await product.save()
    res.status(200).json({ message: "review deleted successfully" });
  }catch(e){
  res.status(500).json({ message: e.message });
  }
}

module.exports = {
  showProduct,
  showOneProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  reviewProduct,
  deleteReview
};
