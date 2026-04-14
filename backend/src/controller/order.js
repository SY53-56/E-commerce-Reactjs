const Cart = require("../models/cart")

const Order = require("../models/order")


const createOrder = async(req,res)=>{
     const userId = req.user.id
     const {address} = req.body
     console.log("address",address)
    try{
    const cart= await Cart.findOne({user:userId})
       if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
// create order 
   const order =new Order({
    user:userId,
    items:cart.items,
    totalAmount:cart.totalAmount,
    address:address
   })
   await order.save();

//clear cart
   cart.items = []
  cart.totalAmount= 0
 
  await cart.save()
  return  res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
    }catch(e){
 res.status(500).json({
      success: false,
      message: e.message,
    });
    }
}

const getAllOrder= async(req,res)=>{
    try{
     const userId = req.user.id

     const order= await Order.find({user:userId})
     console.log(order)
      return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  
    }catch(e){
     res.status(500).json({
      success: false,
      message: e.message,
    });
    }
}
const getSingleOrder =async(req,res)=>{
    try{
        const productId = req.params.id
        const order = await Order.findById(productId)
        return  res.status(200).json({
      success: true,
      message: "Order created successfully",
      order,
    });
    }catch(e){
        res.status(500).json({
      success: false,
      message: e.message,
    }); 
}
}
const getOrderStatus= async(req,res)=>{
   try{
    const {status}= req.body
    const orderId = req.params.id

    const order= await Order.findById(orderId)

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // 🔐 optional: only admin allowed
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }
    const validStatus = ["placed", "shipped", "delivered"];

if (!validStatus.includes(status)) {
  return res.status(400).json({ message: "Invalid status" });
}
order.status= status
  await order.save()
  res.status(200).json({
      success: true,
      message: "Order created successfully",
      order,
    });
    
   }catch(e){
     res.status(500).json({
      success: false,
      message: e.message,
    }); 

   }
}

module.exports = {
    getAllOrder,
    getSingleOrder,
    createOrder,
    getOrderStatus
}