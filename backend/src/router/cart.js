const express = require("express");
const router = express.Router();

const {addCart, getCart, increaseQuantity , decreaseQuantity, removeSingleOrderItem, ApplyDiscount} =require("../controller/cart");
const userAuthentication = require("../middleware/userMiddleware");
router.post("/add",userAuthentication, addCart);
router.get("/",userAuthentication,getCart);
router.put("/increase/:productId",userAuthentication,increaseQuantity);
router.put("/decrease/:productId",userAuthentication,decreaseQuantity);
router.delete("/delete/:productId",userAuthentication , removeSingleOrderItem)
router.post("/discount",userAuthentication,ApplyDiscount)
module.exports  = router