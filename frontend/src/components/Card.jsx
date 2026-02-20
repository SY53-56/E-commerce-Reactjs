import React, { memo } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { useTheme } from "../context/themeContext";
import { Save } from "lucide-react";

function Card({ products = [], user, onAddToCart, onSave, loading }) {
  const { theme } = useTheme();

  if (!products.length) {
    return (
      <p className="w-full mt-5 text-3xl text-center font-semibold text-gray-500 ">
        No products found
      </p>
    );
  }

  return (
    <div className="px-6 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => {
          const imageUrl = p?.image?.[0] ?? "/placeholder.png";

          return (
            <div
              key={p?._id}
              className={`relative rounded-xl p-4 flex flex-col transition-all duration-300 shadow-md hover:shadow-xl
              ${
                theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-900"
              }`}
            >
              <Link to={`/product/${p?._id}`}>
                <div className="w-full h-52 overflow-hidden rounded-lg">
                  <img
                    src={imageUrl}
                    alt={p?.name}
                    className="w-full h-full object-cover hover:scale-105  rounded-md transition-transform duration-300"
                  />
                </div>
              </Link>

              {user && (
              <Button name={<Save size={18} />}    className="absolute top-6 cursor-pointer right-6 bg-gray-500 p-2 rounded-md text-white"  onClick={() => onSave(p._id)} />
               
              )}

              <h3 className="mt-3 font-semibold text-lg truncate">
                {p?.name}
              </h3>

              <div className="mt-auto flex justify-between items-center pt-4">
                <p className="text-green-600 font-bold text-lg">
                  ₹{p?.price}
                </p>

                <Button
                  onClick={() => onAddToCart(p._id)}
                  disabled={loading}
                  className="px-3 py-1 rounded-lg bg-green-600 text-white"
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

export default memo(Card);
