const express = require("express");
const router = express.Router();

const {
  showProduct,
  showOneProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  reviewProduct,
  deleteReview
} = require("../controller/product");

const isAdmin = require("../middleware/adminMiddleware")

const userMiddleware = require("../middleware/userMiddleware");
const uploads = require("../middleware/UploadsImages");

// Get all products (authenticated users)
router.get("/",  showProduct);


// Get single product
router.get("/:id",  showOneProduct);

// Add new product (admin only)
router.post("/add",uploads("image",5), userMiddleware,isAdmin,  addProduct);

// Update product (admin only)
router.put("/update/:id", uploads("images", 5), userMiddleware, isAdmin, updateProduct);

// Delete product (admin only)
router.delete("/delete/:id",userMiddleware , isAdmin, deleteProduct);
router.post("/product/:id/review", userMiddleware,reviewProduct)
router.delete("/product/:id/review/:id" ,userMiddleware, deleteReview)
module.exports = router;
