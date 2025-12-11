const express = require("express")
const {showProduct , showOneProduct, addProduct, updateProduct , deleteProduct} = require("../controller/product")
const isAdmin = require("../middleware/adminMiddleware")
const router = express.Router()

router.get("/", showProduct)
router.get("/:id",showOneProduct)
router.post("/add",isAdmin,addProduct)
router.put("/upadate/:id",isAdmin,updateProduct)
router.delete("/delete/:id",isAdmin,deleteProduct)
module.exports = router