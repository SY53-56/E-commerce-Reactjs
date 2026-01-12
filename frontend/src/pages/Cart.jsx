import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  removeSingleCart,
  increaseQuantity,
  decreaseQuantity,
  discountCoupon,
} from "../features/cart/cartThunk";
import { clearCart } from "../features/cart/cartSlice";


export default function Cart() {
  const dispatch = useDispatch();
  const { cart, loading } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

console.log("cart",cart)
  useEffect(() => {
    if (user) dispatch(getCart());
  }, [dispatch, user]);

    useEffect(()=>{
    if(cart && cart.items.length > 0){
         dispatch(discountCoupon())
    }
    },[cart?.totalAmount, dispatch])
  const handleCheckout = () => {
    alert("Checkout successful!");
    dispatch(clearCart());
  };

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
    <div className="min-h-screen bg-gray-50 py-10 px-4 lg:px-20">
      <h1 className="text-4xl font-bold mb-10 text-gray-900">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1 space-y-6">
          {cart.items.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-28 object-cover rounded-xl flex-shrink-0"
              />
              <div className="flex-1 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-indigo-600 font-bold mt-1">₹{item.price}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item.product._id))}
                      className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                    >
                      −
                    </button>
                    <span className="font-semibold text-lg">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(increaseQuantity(item.product._id))}
                      className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 mt-4 sm:mt-0">
                  <p className="text-gray-900 font-bold text-lg">
                    ₹{item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => dispatch(removeSingleCart(item.product._id))}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="w-full lg:w-96 space-y-6">
          {/* Discount Section */}
     

          {/* Price Summary */}
          <div className="bg-white p-6 rounded-2xl shadow-md space-y-2">
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
