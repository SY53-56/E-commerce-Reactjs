const express = require("express")
const router = express.Router()
const {addToCart, getCartItems, removeCartItem, updateCartItem } = require("../controller/item")
const { userAuthentication } = require("../middleware/userMiddleware")
router.get("/",userAuthentication,getCartItems)
router.post("/add",userAuthentication,addToCart)
router.put("/update/:id",userAuthentication,updateCartItem)
router.delete("/delete/:id",userAuthentication,removeCartItem),
module.exports  =router