import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { showOneProduct } from "../features/product/productThunk";
import {
  addCart,
  decreaseQuantity,
  getCart,
  increaseQuantity,
} from "../features/cart/cartThunk";
import Button from "../components/Button";
import { productPageAnimation } from "../animations/ProductPageAnimation";
import toast from "react-hot-toast";

export default function ProductPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const pageRef = useRef(null);

  const { currentProduct, products, status, error } = useSelector(
    (state) => state.products
  );
  const { cart } = useSelector((state) => state.cart);

  const [relatedProducts, setRelatedProducts] = useState([]);

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    if (id) dispatch(showOneProduct(id));
  }, [dispatch, id]);
console.log("products",currentProduct)
  /* ================= FETCH CART ================= */
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  /* ================= ANIMATION ================= */
  useEffect(() => {
    if (!pageRef.current || !currentProduct) return;
    return productPageAnimation(pageRef.current);
  }, [currentProduct]);

  /* ================= CART ITEM ================= */
  const cartItem = cart?.items?.find(
    (i) =>
      i.product?._id?.toString() ===
      currentProduct?._id?.toString()
  );

  const currentQuantity = cartItem ? cartItem.quantity : 0;

  /* ================= RELATED PRODUCTS ================= */
  useEffect(() => {
    if (!currentProduct || !products?.length) return;

    const data = products
      .filter(
        (p) =>
          p._id !== currentProduct._id &&
          p.category?.toLowerCase() ===
            currentProduct.category?.toLowerCase()
      )
      .slice(0, 4);

    setRelatedProducts(data);
  }, [currentProduct, products]);

  /* ================= HANDLERS ================= */
  const handleAddCart = () => {
    const productId = currentProduct?._id;
    if (!productId) return;

    dispatch(addCart({ productId }));
    toast.success("Added to cart");
  };

  const handleIncrease = async () => {
    if (!cartItem) {
      handleAddCart();
      return;
    }
    await dispatch(increaseQuantity(currentProduct._id));
  };

  const handleDecrease = async () => {
    if (!cartItem || cartItem.quantity <= 1) return;
    await dispatch(decreaseQuantity(currentProduct._id));
  };

  /* ================= UI STATES ================= */
  if (status === "loading")
    return <p className="text-center mt-20">Loading...</p>;
  if (error)
    return <p className="text-center mt-20 text-red-500">{error}</p>;
  if (!currentProduct)
    return <p className="text-center mt-20">Product not found</p>;

  return (
    <div ref={pageRef} className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* PRODUCT CARD */}
        <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* IMAGES */}
          <div>
            <img
              src={currentProduct.image[0]}
              alt={currentProduct.name}
              className="w-full h-[420px] object-contain bg-gray-100 rounded-xl"
            />
            <div className="flex gap-3 mt-4">
              {currentProduct.image.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="w-24 h-20 border rounded-lg object-contain"
                />
              ))}
            </div>
          </div>

          {/* DETAILS */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">
                {currentProduct.name}
              </h1>

              <p className="text-gray-600 mb-6">
                {currentProduct.description}
              </p>

              <p className="text-3xl font-bold text-indigo-600 mb-6">
                ₹{currentProduct.price}
              </p>

              {/* QUANTITY */}
              <div className="flex items-center gap-4 mb-8">
                <button
                  onClick={handleDecrease}
                  disabled={!cartItem || currentQuantity <= 1}
                  className="w-10 h-10 rounded-full bg-gray-200 text-xl font-bold disabled:opacity-40"
                >
                  −
                </button>

                <span className="text-xl font-semibold">
                  {currentQuantity}
                </span>

                <button
                  onClick={handleIncrease}
                  className="w-10 h-10 rounded-full bg-gray-200 text-xl font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-4">
              <Button
                onClick={handleAddCart}
                name="Add to Cart"
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl text-lg"
              />
              <Button
                name="Buy Now"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl text-lg"
              />
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <div key={p._id} className="bg-white rounded-xl shadow-md">
                <Link to={`/product/${p._id}`}>
                  <img src={p.image[0]} className="h-44 w-full object-cover" />
                </Link>
                <div className="p-4">
                  <h3 className="font-semibold truncate">{p.name}</h3>
                  <p className="font-bold text-indigo-600">₹{p.price}</p>
                  <Button
                    onClick={() =>
                      dispatch(addCart({ productId: p._id }))
                    }
                    name="Add to Cart"
                    className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
