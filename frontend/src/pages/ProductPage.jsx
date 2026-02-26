import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { showOneProduct } from "../features/product/productThunk";
import {
  addCart,

  getCart,

} from "../features/cart/cartThunk";
import Button from "../components/Button";
import { productPageAnimation } from "../animations/ProductPageAnimation";
import toast from "react-hot-toast";
import ProductPageSkeleton from "../components/ProductPageSkeleton";
import { useTheme } from "../context/themeContext";
export default function ProductPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const pageRef = useRef(null);
 const {theme} = useTheme()
  const { currentProduct, products, status, error } = useSelector(
    (state) => state.products
  );
 const {user}= useSelector(state=>state.auth)

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
 

  /* ================= RELATED PRODUCTS ================= */
  useEffect(() => {
    if (!currentProduct || !products?.length) return;

    const data = products
      .filter(
        (p) =>
          p?._id !== currentProduct?._id &&
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
     if(!user) return toast.error("please login first")
    dispatch(addCart({ productId }));
    toast.success("Added to cart");
  };

 const isOnwer =   
  user?.id &&
  (user.id === currentProduct?.userAdmin?._id ||
   user.id === currentProduct?.userAdmin);


console.log("ghkdjhdcc",currentProduct?.userAdmin._id)
   console.log( 'onwer',isOnwer)
   console.log("user product", user)
  /* ================= UI STATES ================= */
if (status === "loading") {
  return <ProductPageSkeleton />
}


  if (error)
    return <p className="text-center mt-20 text-red-500">{error}</p>;
  if (!currentProduct)
    return <p className="text-center mt-20">Product not found</p>;

 return (
  <div ref={pageRef} className="min-h-screen bg-[#f5f6f7] py-10">
    <div className="max-w-6xl mx-auto px-4">

      {/* PRODUCT CARD */}
      <div className="bg-white rounded-3xl shadow-md p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* LEFT: IMAGE */}
        <div>
          <div className=" flex items-center justify-center h-[420px]">
            <img
              src={currentProduct.image[0]}
              alt={currentProduct.name}
              className="h-full object-contain rounded-lg transition-transform hover:scale-105"
            />
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-3 mt-4 overflow-x-auto">
            {currentProduct.image.map((img, i) => (
              <img
                key={i}
                src={img}
                className="w-20 h-20 bg-gray-100 rounded-xl object-contain border hover:border-green-500 cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* RIGHT: DETAILS */}
        <div className="flex flex-col justify-between">

          {/* PRODUCT INFO */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {currentProduct.name}
            </h1>

            <p className="text-sm text-gray-500 mb-4">
              Brand: <span className="font-medium">{currentProduct.brand}</span>
            </p>

            <p className="text-gray-700 leading-relaxed mb-6 w-80  lg:max-w-md">
              {currentProduct.description}
            </p>

            {/* PRICE */}
            <div className="mb-6">
              <span className="text-3xl font-bold text-gray-900">
                ₹{currentProduct.price}
              </span>
              <p className="text-sm text-gray-500">
                Inclusive of all taxes
              </p>
            </div>

            {/* ADD TO CART */}
          <div className=" flex    gap-4">
             <Button
              onClick={handleAddCart}
              name="Add to Cart"
              className={`px-8 py-3 ${theme ==="dark"?"bg-gray-900 hover:bg-gray-950 ":"bg-blue-500 hover:bg-blue-600"}  text-white rounded-xl  transition`}
            />
        {isOnwer && (     <Button to={ `/update/${currentProduct._id}`} className="bg-blue-500  px-8 py-3  rounded-xl text-white hover:bg-blue-600 transition-all duration-500"  name="update"/>)}
            </div> 
          </div>

          {/* FEATURES */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700">
            <div className="bg-gray-100 rounded-xl p-4">
              🚚 <span className="font-semibold">Express Delivery</span>
              <p className="text-xs mt-1">Round-the-clock delivery</p>
            </div>

            <div className="bg-gray-100 rounded-xl p-4">
              💰 <span className="font-semibold">Best Price</span>
              <p className="text-xs mt-1">Direct from manufacturers</p>
            </div>

            <div className="bg-gray-100 rounded-xl p-4">
              ✅ <span className="font-semibold">Genuine Products</span>
              <p className="text-xs mt-1">30,000+ items available</p>
            </div>
          </div>

        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="mt-16">
        <h2 className="text-2xl text-black font-bold mb-6">
          Related Products
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition"
            >
              <Link to={`/product/${p._id}`}>
                <div className="h-40 bg-gray-100 rounded-t-2xl flex items-center justify-center">
                  <img
                    src={p.image[0]}
                    className="h-full object-contain hover:scale-105 transition"
                  />
                </div>
              </Link>

              <div className="p-4">
                <h3 className="text-sm font-medium truncate mb-1">
                  {p.name}
                </h3>

                <p className="font-bold text-gray-900 mb-3">
                  ₹{p.price}
                </p>

                <Button
                  onClick={() =>
                    dispatch(addCart({ productId: p._id }))
                  }
                  name="Add"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
)

}
