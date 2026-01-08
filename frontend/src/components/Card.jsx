import { Link } from "react-router-dom";
import Button from "./Button";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../features/cart/cartThunk";

export default function Card({ products, searchText }) {
  const dispatch = useDispatch();
  const [debouncedSearch, setDebouncedSearch] = useState("");


   console.log("hsjkdsjkd",products)
  /* ===== SEARCH DEBOUNCE ===== */
  useEffect(() => {
    const time = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 400);

    return () => clearTimeout(time);
  }, [searchText]);

  const filteredProducts =
    !debouncedSearch || debouncedSearch.trim() === ""
      ? products
      : products.filter((p) =>
          (p.name || "").toLowerCase().includes(debouncedSearch.toLowerCase())
        );
 console.log("filterProduct",filteredProducts)
  const handleAddCart = (productId) => {
    dispatch(addCart({productId:productId}));
  };

  return (
    <div className="px-6 py-8">
      {filteredProducts.length === 0 ? (
        <p className="text-center text-2xl font-bold text-gray-500">
          No products found
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col"
            >
              {/* Image */}
              <div className="w-full h-52 overflow-hidden rounded-lg">
                <Link to={`/product/${p._id}`}>
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                  />
                </Link>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 truncate mt-2">
                {p.name}
              </h3>

              <div className="mt-4 flex justify-between items-center">
                <p className="text-green-600 font-bold text-lg">
                  ₹{p.price}
                </p>
                <Button
                  onClick={() => handleAddCart(p._id)}
                  className="px-2 py-1 rounded-lg text-white bg-green-600"
                  name="Add cart"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
