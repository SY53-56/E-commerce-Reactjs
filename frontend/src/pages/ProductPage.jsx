import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { showOneProduct } from "../features/product/productThunk";
import { addCart } from "../features/cart/cartThunk";
import Button from "../components/Button";

export default function ProductPage() {
  const dispatch = useDispatch();
  const { currentProduct, products, status, error } = useSelector(
    (state) => state.products);
 // const {decearce} = useSelector(state=> state.cart)
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  console.log("currentproduct", currentProduct)
  console.log("product", products)
 
  // Fetch product by ID
  useEffect(() => {
    if (id) dispatch(showOneProduct(id));
  }, [dispatch, id]);

  // Filter related products
  useEffect(() => {
    if (currentProduct && products?.length) {
      const data = products
        .filter(
          (p) =>
            p._id !== currentProduct.product._id &&
            (p.category?.toLowerCase() ===
              currentProduct.product.category?.toLowerCase() ||
              p.title
                ?.toLowerCase()
                .includes(currentProduct.product.title?.toLowerCase()))
        )
        .slice(0, 4); // limit to 4 related products
      setRelatedProducts(data);
    }
  }, [currentProduct, products]);

  // Add to cart
  const handleAddCart = () => {
    dispatch(
      addCart({productId:currentProduct.product._id ,quantity})
    );
    alert("addcartb success")
  };


  const handleIncrease = () => setQuantity((q) => q + 1);
  const handleDecrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  if (status === "loading")
    return <p className="text-center mt-20 text-gray-500">Loading...</p>;
  if (error)
    return <p className="text-center mt-20 text-red-500">{error}</p>;
  if (!currentProduct)
    return <p className="text-center mt-20 text-gray-500">Product not found</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-200 py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Product Info */}
        <div className="bg-white rounded-3xl shadow-2xl flex flex-col lg:flex-row gap-10 p-6 lg:p-12">
          <div className="lg:w-1/2 flex items-center justify-center bg-gray-50 rounded-xl p-6 hover:shadow-xl transition-shadow duration-300">
            <img
              src={currentProduct.product.image}
              alt={currentProduct.product.title}
              className="object-contain w-full h-80 lg:h-[450px] rounded-xl hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="lg:w-1/2 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                {currentProduct.product.title}
              </h1>
              <p className="text-gray-700 mb-6">
                {currentProduct.product.description}
              </p>
              <h2 className="text-3xl font-bold text-indigo-600 mb-6">
                ₹{currentProduct.product.price}
              </h2>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={handleDecrease}
                className="px-3 py-1 bg-gray-200 rounded-md font-bold hover:bg-gray-300 transition"
              >
                −
              </button>
              <span className="font-semibold text-xl">{quantity}</span>
              <button
                onClick={handleIncrease}
                className="px-3 py-1 bg-gray-200 rounded-md font-bold hover:bg-gray-300 transition"
              >
                +
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={handleAddCart}
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-all duration-300"
                name="Add to Cart"
              />
              <Button
                className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-semibold py-3 px-8 rounded-xl shadow-lg transition-all duration-300"
                name="Buy Now"
              />
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          {relatedProducts.length === 0 ? (
            <p className="text-center text-gray-500">No related products.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <div
                  key={p._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col"
                >
                  <Link to={`/product/${p._id}`}>
                    <div className="w-full h-52 overflow-hidden rounded-lg">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                      />
                    </div>
                  </Link>
                  <h3 className="text-lg font-semibold text-gray-800 mt-4 truncate">
                    {p.title}
                  </h3>
                  <p className="text-green-600 font-bold text-lg mt-2">
                    ₹{p.price}
                  </p>
                  <Button
                    onClick={() =>
                      dispatch(addCart({ productId: p._id, quantity: 1 }))
                    }
                    className="mt-2 px-2 py-1 rounded-lg text-white bg-green-600 hover:bg-green-700"
                    name="Add Cart"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
