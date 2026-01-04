import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  removeSingleCart,
  increaseQuantity,
  decreaseQuantity,
} from "../features/cart/cartThunk";
import Button from "../components/Button";

export default function Cart() {
  const dispatch = useDispatch();
  const { cart, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);
console.log("cart",cart)
  if (loading) {
    return (
      <p className="text-center mt-20 text-xl font-semibold text-gray-500">
        Loading cart...
      </p>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">
        🛒 Your cart is empty
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 lg:px-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Shopping Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-6">
          {cart.items.map((item) => (
            <div
              key={item.product._id}
              className="flex items-center justify-between border-b py-5"
            >
              <div className="flex items-center gap-5">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-xl"
                />

                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-gray-500">₹{item.price}</p>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() =>
                        dispatch(decreaseQuantity(item.product))
                      }
                      className="px-3 py-1 bg-gray-200 cursor-pointer rounded-md font-bold"
                    >
                      −
                    </button>

                    <span className="font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        dispatch(increaseQuantity(item.product))
                      }
                      className="px-3 py-1 bg-gray-200 cursor-pointer rounded-md font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3">
                <p className="font-bold text-gray-800">
                  ₹{item.price * item.quantity}
                </p>

                <button
                  onClick={() =>
                    dispatch(removeSingleCart(item.product))
                  }
                  className="text-red-500 cursor-pointer hover:underline text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
         

          <div className="flex flex-col gap-3">

           <div className="w-full lg:w-96 bg-white rounded-2xl shadow-lg p-6 h-fit">
            <h1 className="text-xl  font-bold">Apply discount</h1>
            <div className="flex mt-3">
              <input className="border px-2 py-1 rounded-md  border-none bg-gray-200 rounded-r-none outline-none border-black border-r-0" type="text" placeholder=" apply couppon"/>
              <Button name="Apply" className="border px-2 py-1 rounded-md rounded-l-none bg-green-500  hover:bg-green-600 text-white border-l-0"/>
            </div>
           </div>
        {/* RIGHT */}
        <div className="w-full lg:w-96 bg-white rounded-2xl shadow-lg p-6 h-fit">
          <h2 className="text-xl font-semibold border-b pb-4 text-gray-700">
            Price Details
          </h2>

          <div className="flex justify-between mt-4">
            <span className="text-gray-600">Price</span>
            <span className="font-semibold">₹{cart.totalAmount}</span>
          </div>

          <div className="flex justify-between mt-3">
            <span className="text-gray-600">Discount</span>
            <span className="text-green-600 font-semibold">
              − ₹{cart.discountAmount || 0}
            </span>
          </div>

          <div className="flex justify-between mt-4 border-t pt-4">
            <span className="text-lg font-bold">Total Amount</span>
            <span className="text-lg font-bold">
              ₹{cart.finalAmount || cart.totalAmount}
            </span>
          </div>

          {cart.discountAmount > 0 && (
            <p className="text-green-600 mt-3 font-medium">
              🎉 You saved ₹{cart.discountAmount}
            </p>
          )}

          <button className="w-full mt-6 cursor-pointer active:scale-95 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold">
            Proceed to Checkout
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}
