import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  removeSingleCart,
  increaseQuantity,
  decreaseQuantity,
} from "../features/cart/cartThunk";

import CartCard from "../components/CartCard";
import { useNavigate } from "react-router";
import { useTheme } from "../context/themeContext";
import Input from "../components/Input"
import { getCreateOrder } from "../features/order/orderThunk";
export default function Cart() {
  const dispatch = useDispatch();
  const { cart, loading } = useSelector((state) => state.cart);
  const user = useSelector(state => state.auth.user)
  const [ShowOrderForm, setShowOrderForm] = useState(false)
  const [form, setForm] = useState({
    name: "",
    state: "",
    city: "",
    pinCode: "",
    gali: "",
  });

  const navigate = useNavigate()

  const { theme } = useTheme()

  useEffect(() => {
    dispatch(getCart())
  }, [dispatch]);



  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = () => {
    setShowOrderForm(prev => !prev)
  };

  const handleOrder = useCallback(async (e) => {
    e.preventDefault();

    try {

      // Use form address
      await dispatch(getCreateOrder({ address: form })).unwrap();


      navigate(`/product/order/${user.id}`);

    } catch (err) {
      console.error(err);
    }

  }, [dispatch, navigate, form, user]);

  const handleIncreaseQuantity = useCallback((id) => {
    dispatch(increaseQuantity(id))

  }, [dispatch])

  const handleDecreaseQuantity = useCallback((id) => {
    dispatch(decreaseQuantity(id))
  }, [dispatch])

  const handleRemoveCart = useCallback((id) => {
    dispatch(removeSingleCart(id))
  }, [dispatch])

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-xl">Loading cart...</p>
      </div>
    );

  if (!cart || !cart.items || cart.items.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 text-xl">
        🛒 Your cart is empty
      </div>
    );

  return (
    <div className={`min-h-screen relative  bg-gray-100 py-10 px-4 lg:px-20`}>
      <h1 className="text-4xl font-bold mb-10 text-gray-900">Shopping Cart</h1>

      <div className={`flex flex-col lg:flex-row  ${ShowOrderForm === true ? ("opacity-20") : ("opacity-100")} gap-8`}>
        {/* Cart Items */}
        <div className="flex-1 space-y-6">
          {cart?.items?.map((item) => (
            <CartCard key={item._id} item={item}
              handleDecreaseQuantity={handleDecreaseQuantity}
              handleIncreaseQuantity={handleIncreaseQuantity}
              handleRemoveCart={handleRemoveCart} />
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
              <span>− ₹{cart.discountAmount}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-3 border-t pt-2">
              <span>Total</span>
              <span>₹{cart.finalAmount}</span>
            </div>
            <button
              onClick={handleCheckout}
              className={`w-full cursor-pointer mt-4 ${theme === "light" ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-900 hover:bg-gray-950"}  text-white py-3 rounded-xl font-semibold shadow-lg transition`}
            >
              Checkout
            </button>
          </div>

        </div>
      </div>
      {ShowOrderForm && (
        <div className={` ${ShowOrderForm === true ? "z-50" : ""} w-full  lg:ml-0 absolute top-7 right-1.5 lg:top-28 lg:right-1/3 flex flex-col  justify-center   max-w-2xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6`}>

          {/* Heading */}
          <h1 className="text-2xl  md:text-3xl font-bold text-black mb-6 text-center">
            Place Your Order 🛒
          </h1>

          {/* Form */}

          <form onSubmit={handleOrder} className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="bg-white/10 text-gray-950   border border-gray-700  outline-none focus:ring-2 focus:ring-amber-400 transition  px-4 py-2 rounded-lg outline-none"
            />

            <Input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              className="bg-white/10 text-gray-950  border border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-amber-400 transition  px-4 py-2 rounded-lg outline-none"
            />

            <Input
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="State"
              className="bg-white/10 text-gray-950   px-4 py-2  border border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-amber-400 transition rounded-lg outline-none"
            />

            <Input
              name="pinCode"
              value={form.pinCode}
              onChange={handleChange}
              placeholder="Pincode"
              className="bg-white/10  border border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-amber-400 transition text-gray-950 px-4 py-2 rounded-lg outline-none"
            />

            <Input
              name="gali"
              value={form.gali}
              onChange={handleChange}
              placeholder="Street / Gali"
              className="bg-white/10  border border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-amber-400 transition text-gray-950   px-4 py-2 rounded-lg outline-none md:col-span-2"
            />
            <button type="submit"
              className="w-full mt-6 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-xl transition-all shadow-md"
            >
              Place Order 🚀
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
