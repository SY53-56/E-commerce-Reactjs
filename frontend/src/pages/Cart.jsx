import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  removeSingleCart,
  increaseQuantity,
  decreaseQuantity,
} from "../features/cart/cartThunk";
import  {clearCart} from "../features/cart/cartSlice";
import CartCard  from "../components/CartCard";
import { useNavigate } from "react-router";

export default function Cart() {
  const dispatch = useDispatch();
  const { cart, loading } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate()
//console.log("cartdata",cart.items.map(item=>item.product.name))

  useEffect(() => {
    if (user) dispatch(getCart());
  }, [dispatch, user]);
useEffect(() => {
  console.log("cart changed", cart)
}, [cart])


  const handleCheckout = () => {
    alert("Checkout successful!");
    dispatch(clearCart());
  navigate("/")
  };

  const handleIncreaseQuantity= useCallback((id)=>{
      dispatch(increaseQuantity(id))
  },[dispatch])
 
  const handleDecreaseQuantity = useCallback((id)=>{
dispatch(decreaseQuantity(id))
  },[dispatch])
  
  const handleRemoveCart= useCallback((id)=>{
dispatch(removeSingleCart(id))
  },[dispatch])

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-xl">Loading cart...</p>
      </div>
    );

  if (!cart || cart.items.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 text-xl">
        🛒 Your cart is empty
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 lg:px-20">
      <h1 className="text-4xl font-bold mb-10 text-gray-900">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1 space-y-6">
          {cart.items.map((item) => (
          <CartCard key={item._id} item={item}
           handleDecreaseQuantity={handleDecreaseQuantity}
            handleIncreaseQuantity={handleIncreaseQuantity}
             handleRemoveCart={handleRemoveCart}/>
          ))}
        </div>

        {/* Summary */}
        <div className="w-full lg:w-96 space-y-6">
          {/* Discount Section */}
     

          {/* Price Summary */}
          <div className="bg-white p-6 rounded-2xl text-black shadow-md space-y-2">
            <h2 className="text-xl font-bold border-b pb-2">Price Details</h2>
            <div className="flex justify-between mt-3">
              <span>Subtotal</span>
              <span>₹{cart.totalAmount}</span>
            </div>
            <div className="flex justify-between mt-1 text-green-600">
              <span>Discount</span>
              <span>− ₹{cart.discountAmount }</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-3 border-t pt-2">
              <span>Total</span>
              <span>₹{cart.finalAmount }</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold shadow-lg transition"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
