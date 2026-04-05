const express = require("express");
const { createOrder, getAllOrder, getSingleOrder, getOrderStatus } = require("../controller/order");
const userMiddleware = require("../middleware/userMiddleware");
const isAdmin = require("../middleware/adminMiddleware");
const router = express.Router();


router.post("/", createOrder)
router.get("/allorder/:userId", userMiddleware, getAllOrder)
router.get("/singleOrder/:orderId" ,userMiddleware, getSingleOrder)
router.post("/:id",userMiddleware, isAdmin ,getOrderStatus )
module.exports =router