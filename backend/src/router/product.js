const express = require("express");
const router = express.Router();

const {
  showProduct,
  showOneProduct,
  addProduct,
  updateProduct,
  deleteProduct
} = require("../controller/product");

const isAdmin = require("../middleware/adminMiddleware")

const userMiddleware = require("../middleware/userMiddleware");

// Get all products (authenticated users)
router.get("/",  showProduct);


// Get single product
router.get("/:id",  showOneProduct);

// Add new product (admin only)
router.post("/add", userMiddleware,isAdmin,  addProduct);

// Update product (admin only)
router.put("/update/:id", userMiddleware , isAdmin, updateProduct);

// Delete product (admin only)
router.delete("/delete/:id",userMiddleware , isAdmin, deleteProduct);

module.exports = router;
