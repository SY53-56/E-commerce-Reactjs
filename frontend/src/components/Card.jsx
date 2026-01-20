import { Link } from "react-router-dom";
import Button from "./Button";
import { useTheme } from "../context/themeContext";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../features/cart/cartThunk";
import toast from "react-hot-toast";
export default function Card({ products ,user}) {
 const {loading} = useSelector(state=>state.cart)
  const { theme } = useTheme();
const dispatch = useDispatch()
  if (!Array.isArray(products) || products.length === 0) {
    return (
      <p className="text-center text-xl font-semibold text-gray-500">
        No products found
      </p>
    );
  }
 


const handleAddToCart = async (id) => {
  try {
    if(!user) return toast.error("please login ")
    await dispatch(addCart({ productId: id })).unwrap();
    toast.success("Added to cart 🛒");
  } catch (err) {
    toast.error(err || "Please login first");
  }
};

  return (
    <div className="px-6 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => {
          const imageUrl =
            p?.image?.[0] ||
            p?.image?.[1] ||
            "/placeholder.png";

          return (
            <div
              key={p?._id}
              className={`rounded-xl p-4 flex flex-col transition-all duration-300
              ${theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-900"}
              shadow-md hover:shadow-xl`}
            >
              {/* Image */}
              <Link to={`/product/${p?._id}`}>
                <div className="w-full h-52 overflow-hidden rounded-lg">
                  <img
                    src={imageUrl}
                    alt={p?.name || "product"}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>

              {/* Name */}
              <h3 className="mt-3 font-semibold text-lg truncate">
                {p?.name}
              </h3>

              {/* Price + Action */}
              <div className="mt-auto flex justify-between items-center pt-4">
                <p className="text-green-600 font-bold text-lg">
                  ₹{p?.price}
                </p>

              <Button
  onClick={() => handleAddToCart(p._id)}
  disabled={loading}
  className={`px-3 py-1 rounded-lg text-white
    ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
  name={loading ? "Adding..." : "Add Cart"}
/>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
