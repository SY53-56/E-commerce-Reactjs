const Cart = require("../models/cart");
const Product = require("../models/product")
const addCart = async (req, res) => {
  try {
    const { items } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Please login first" });
    }

    let data = [];
    let totalAmount = 0;

    for (let item of items) {
       const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const allData = {
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: item.quantity,
      };
      totalAmount += items.price * items.quantity;
      data.push(allData);
    }

     const cart = await  Cart.findOne({user:req.user._id})
     if(!cart){
     cart = await Cart.create({
      user: req.user._id,
      allItem: data,
      amount: totalAmount,
      status: "pending",
    })
     }else{
        for(let newItem of data){
          const indexCart = cart.items.findIndex((d)=>{
            d.product.toString() === newItem.product.toString()
          })
          if(indexCart>1){
          cart.items[indexCart].quantity +=newItem.quantity
          }else{
            cart.items.puch(newItem)
          }
        }
         cart.totalAmount.reduce((sum,i)=>{
      sum+i.i.price*i.quantity,0
     }
    )
      await cart.save();
     }
    

    return res.status(201).json({
      message: "Order added successfully",
         data: cart,
             success: true,
    });

  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};





const getCart = async(req,res)=>{
  try{
 
    
    if(!req.user){
      return res.status(401).json("please add items")
    }

    const cartData= await  Cart.findOne({user:req.user._id}).populate("items.product")
      
    if(!cartData){
      return res.status(200).json({message:"cart is empty",
        success: true,
        data: { items: [] },

      })
    }
res.status(201).json({
     success: true,
      message: "Cart fetched successfully",
      data: cartData,
})
  }catch(e){
    res.status(400).json({message:e});
  }
};

const decreaseQuantity = async(req,res)=>{
  try{
    const  {productId} =- req.params;
    

    const cart = await Cart.findByIdAndUpdate(
      {user:req.user._id,
         "items.product": productId,
        "items.quantity": { $gt: 1 },
      },
      {
        $inc:{"items.$.quantity": -1 }
      },

      {new:true}
  )
  if(!cart){
    await  Cart.findByIdAndUpdate(
      {user:req.user._id},
      {$pull:{items:{product:productId}}}
    )
  }
  
    return res.status(200).json({
      success: true,
      message: "Quantity updated",
      data: cart,
    });

  }catch(e){
    res.status(400).json({message:e})
  }
}


const increaseQuantity = async(req,res)=>{
  try{
     const {productId} = req.params;
     const cart = await Cart.findByIdAndUpdate(
      {user:req.user._id,
      "items.product": productId,
      },
      {$inc:{"items.quanitity": 1}},
      {new:true}
    )
       if (!cart) {
      cart = await Cart.findOneAndUpdate(
        { user: req.user._id },
        { $pull: { items: { product: productId } } },
        { new: true }
      );
    }

    return res.status(200).json({
      success: true,
      message: "Quantity updated",
      data: cart,
    });
  }catch(e){

  }
}


const removeSingleOrderItem = async (req, res) => {
  try {
    const { productId } = req.params;

    const order = await Cart.findOneAndUpdate(
      {
        user: req.user._id,
        status: "pending", // 🔒 only pending order editable
      },
      {
        $pull: { items: { product: productId } },
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found or item not present",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product removed from order",
      data: order,
    });

  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

module.exports = { removeSingleOrderItem ,getCart , addCart,increaseQuantity,decreaseQuantity};

