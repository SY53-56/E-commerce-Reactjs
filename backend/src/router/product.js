const express = require("express")
const {showProduct , showOneProduct, addProduct, updateProduct , deleteProduct} = require("../controller/product")
const isAdmin = require("../middleware/adminMiddleware")
const userAuthentication = require("../middleware/userMiddleware")
const router = express.Router()

router.get("/",userAuthentication ,showProduct)
router.get("/:id",userAuthentication ,showOneProduct)
router.post("/add",userAuthentication ,isAdmin,addProduct)
router.put("/upadate/:id",userAuthentication ,isAdmin,updateProduct)
router.delete("/delete/:id",userAuthentication ,isAdmin,deleteProduct)
module.exports = router