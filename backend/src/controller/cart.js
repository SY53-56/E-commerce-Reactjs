const Cart = require("../models/cart");
const Product = require("../models/product")

const addCart = async (req, res) => {
  try {
     let {items} = req.body;
    
 
     if(req.user)return req.status(200).json(" please login")   
      
  let cart = await Cart.findOne({user:req.user._id})
    if(!cart){
      await Cart.create({
        user:req.user._id,
        items: [],
          totalAmount: 0,
        status: "pending",
      })
    }
    for(let item of items){
      let product= await Product.findById(item.productId)
      if(!product)continue

      
      const index = cart.items.findIndex(
        (i) => i.product.toString() === product._id.toString()
      );
      
      if(index>-1){
        cart.items[index].quantity+=item.quantity
      }else{
         cart.items.push({
          product: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: item.quantity,
        });
      }
    }
  cart.totalAmount = cart.items.reduce((sum,i)=>sum+i.price*i.quantity,0)
   
cart.finalAmount = cart.totalAmount
   res.status(201).json({
      success: true,
      message: "Product added to cart",
      data: cart,
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
    

   let cart = await Cart.findOneAndUpdate({
    user:req.user._id,
    "items.product":productId
   },
    {
      $pull:{"items.$.quantity":-1}
    },
    {
      mew:true
    }
  )
  
    return res.status(200).json({
      success: true,
      message: "Quantity updated",
      data: cart,
    });

  }catch(e){
    res.status(400).json({message:e})
  }
}
const ApplyDiscount = async(req,res)=>{
  try{
      let {discountCode}= req.body 
    
      let userId = req.user._id

   if(!req.user) return res.status(200).json("please login")
    let cart = await  Cart.findOne({user:userId})
    let discountNum = 0
 if(discountCode ==="SAVE123"){
  discountNum = 24
 }else if(discountCode==="SAHUL25"){
  discountNum = 30
 }else if(discountCode ==="PRODUCT65"){

 }else{
 res.status(400).json("invail coupns")
 }
cart.discount = discountNum
cart.discountAmount = (cart.totalAmount*cart.discount)/100
cart.finalAmount = (cart.totalAmount-cart. discountAmount)
cart. couponCode= discountCode
await cart.save()
res.status(200).json({success:true,message:"successfully add coupon", cart})

  }catch(e){
      return res.status(400).json({
      success: false,
      message: e.message,
    });
  }
}
const increaseQuantity = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOneAndUpdate(
      {
        user: req.user._id,
        "items.product": productId,
      },
      {
        $inc: { "items.$.quantity": 1 },
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Quantity increased",
      data: cart,
    });

  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};



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

module.exports = { removeSingleOrderItem, ApplyDiscount ,getCart , addCart,increaseQuantity,decreaseQuantity};

