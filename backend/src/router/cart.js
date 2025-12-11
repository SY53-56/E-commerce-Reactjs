const express = require("express")
const router = express.Router()
const {addToCart, getCartItem, removeCartItem, updateCartItem } = require("../controller/item")
const  userAuthentication  = require("../middleware/userMiddleware")
router.get("/",userAuthentication,getCartItem)

// Check if they are functions

router.post("/add",userAuthentication,addToCart)
router.put("/update/:id",userAuthentication,updateCartItem)
router.delete("/delete/:id",userAuthentication,removeCartItem),
module.exports  =router