const express = require("express");
const router = express.Router();

const {
  showProduct,
  showOneProduct,
  addProduct,
  updateProduct,
  deleteProduct
} = require("../controller/product");

const isAdmin = require("../middleware/adminMiddleware");
const userAuthentication = require("../middleware/userMiddleware");
console.log(showProduct, addProduct);
// Get all products (authenticated users)
router.get("/", userAuthentication, showProduct);
console.log('sjsjfhdkjjf', userAuthentication, isAdmin);

// Get single product
router.get("/:id", userAuthentication, showOneProduct);

// Add new product (admin only)
router.post("/add", userAuthentication, isAdmin, addProduct);

// Update product (admin only)
router.put("/update/:id", userAuthentication, isAdmin, updateProduct);

// Delete product (admin only)
router.delete("/delete/:id", userAuthentication, isAdmin, deleteProduct);

module.exports = router;
