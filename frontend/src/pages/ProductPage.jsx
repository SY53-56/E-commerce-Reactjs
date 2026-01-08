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

  /* ================= GSAP ANIMATION ================= */
  useEffect(() => {
    if (!pageRef.current || !currentProduct) return;

    const cleanup = productPageAnimation(pageRef.current);
    return cleanup;
  }, [currentProduct]);

  /* ================= FETCH CART ================= */
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  /* ================= CURRENT CART ITEM ================= */
  const cartItem = cart?.items?.find(
    (i) => i.product._id === currentProduct?.product?._id
  );

  const currentQuantity = cartItem ? cartItem.quantity : 1;

  /* ================= RELATED PRODUCTS ================= */
  useEffect(() => {
    if (currentProduct && products?.length) {
      const data = products
        .filter(
          (p) =>
            p._id !== currentProduct.product._id &&
            p.category?.toLowerCase() ===
              currentProduct.product.category?.toLowerCase()
        )
        .slice(0, 4);
      setRelatedProducts(data);
    }
  }, [currentProduct, products]);

  /* ================= HANDLERS ================= */
  const handleAddCart = () => {
    dispatch(addCart({ productId: currentProduct.product._id }));
  };

  const handleIncrease = () => {
    if (!cartItem) {
      dispatch(addCart({ productId: currentProduct.product._id }));
    } else {
      dispatch(increaseQuantity(currentProduct.product._id));
    }
  };

  const handleDecrease = () => {
    if (cartItem && cartItem.quantity > 1) {
      dispatch(decreaseQuantity(currentProduct.product._id));
    }
  };

  /* ================= UI STATES ================= */
  if (status === "loading")
    return <p className="text-center mt-20">Loading...</p>;
  if (error)
    return <p className="text-center mt-20 text-red-500">{error}</p>;
  if (!currentProduct)
    return <p className="text-center mt-20">Product not found</p>;

  return (
    <div ref={pageRef} className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* ================= PRODUCT ================= */}
        <div className="product bg-white rounded-xl shadow-lg p-6 flex flex-col  lg:flex-row gap-10">
          <img
            src={currentProduct.product.image}
            alt={currentProduct.product.name}
            className="w-full lg:w-1/2 h-96 object-contain"
          />

          <div className="lg:w-1/2 mt-6">
            <h1 className="text-3xl font-bold mb-4">
              {currentProduct.product.name}
            </h1>
            <p className="text-gray-600 mb-4">
              {currentProduct.product.description}
            </p>
            <p className="text-2xl font-bold mb-6">
              ₹{currentProduct.product.price}
            </p>

            {/* ================= QUANTITY ================= */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={handleDecrease}
                disabled={currentQuantity <= 1}
                className="px-3 py-1 bg-gray-200 rounded-md font-bold disabled:opacity-50"
              >
                −
              </button>

              <span className="text-xl font-semibold">
                {currentQuantity}
              </span>

              <button
                onClick={handleIncrease}
                className="px-3 py-1 bg-gray-200 rounded-md font-bold"
              >
                +
              </button>
            </div>

            {/* ================= ACTIONS ================= */}
            <div className="flex gap-4">
              <Button
                onClick={handleAddCart}
                name="Add to Cart"
                className="bg-yellow-500 text-white px-6 py-2 rounded-lg"
              />
              <Button
                name="Buy Now"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* ================= RELATED ================= */}
        <div className="related-product mt-12">
          <h2 className="text-2xl font-bold mb-4">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-lg shadow p-4"
              >
                <Link to={`/product/${p._id}`}>
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-40 w-full object-cover mb-3"
                  />
                </Link>
                <h3 className="font-semibold">{p.name}</h3>
                <p className="font-bold">₹{p.price}</p>
                <Button
                  onClick={() =>
                    dispatch(addCart({ productId: p._id }))
                  }
                  name="Add Cart"
                  className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
