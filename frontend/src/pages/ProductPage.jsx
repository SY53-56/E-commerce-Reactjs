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

export default function ProductPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const pageRef = useRef(null);

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
     if(!user) return toast.error("please login first")
    dispatch(addCart({ productId }));
    toast.success("Added to cart");
  };

  /* ================= UI STATES ================= */
  if (status === "loading")
    return <p className="text-center mt-20">Loading...</p>;
  if (error)
    return <p className="text-center mt-20 text-red-500">{error}</p>;
  if (!currentProduct)
    return <p className="text-center mt-20">Product not found</p>;

  return (
    
    <div ref={pageRef} className="min-h-screen bg-[#f5f6f7] py-8">
      <div className="max-w-6xl mx-auto px-4">

        {/* PRODUCT CARD */}
        <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* LEFT: IMAGE */}
          <div>
            <div className="bg-[#f7f7f7] rounded-xl flex items-center justify-center h-[420px]">
              <img
                src={currentProduct.image[0]}
                alt={currentProduct.name}
                className="h-full object-contain"
              />
            </div>

            <div className="flex gap-3 mt-4 overflow-x-auto">
              {currentProduct.image.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="w-20 h-20 bg-[#f7f7f7] rounded-lg object-contain border"
                />
              ))}
            </div>
          </div>

          {/* RIGHT: DETAILS */}
          <div className="flex flex-col ">

            {/* TOP INFO */}
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                {currentProduct.name}
              </h1>

              <p className="text-sm text-gray-500 mb-4">
                Brand: <span className="font-medium">{currentProduct.brand}</span>
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                {currentProduct.description}
              </p>

            </div>

            {/* ACTION */}
            <div className=" flex gap-6 justify-between items-center">
               <div className="flex items-start flex-col gap-2 mb-6">
                <span className="text-2xl font-bold text-gray-900">
                  ₹{currentProduct.price}
                </span>
                <span className="text-sm text-gray-500">
                  (Inclusive of taxes)
                </span>
              </div>
              <Button
                onClick={handleAddCart}
                name="Add to Cart"
                className=" px-5 bg-green-600 py-2 hover:bg-green-700 text-white  rounded-xl text-[20px] "
              />
            </div>
         <p className="text-black mt-10">
             express delivery	
Round The Clock Delivery
Get items delivered to your doorstep from dark stores near you, whenever you need them.
best price
Best Prices & Offers
Best price destination with offers directly from the manufacturers.
genuine products
Wide Assortment
Choose from 30,000+ products across food, personal care, household & other categories.
         </p>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <div className="mt-14">
          <h2 className="text-2xl font-semibold mb-6">
            Related Products
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {relatedProducts.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition"
              >
                <Link to={`/product/${p._id}`}>
                  <div className="h-40 bg-[#f7f7f7] rounded-t-xl flex items-center justify-center">
                    <img
                      src={p.image[0]}
                      className="h-full object-contain"
                    />
                  </div>
                </Link>

                <div className="p-4">
                  <h3 className="text-sm font-medium truncate mb-1">
                    {p.name}
                  </h3>

                  <p className="font-bold text-gray-900">
                    ₹{p.price}
                  </p>

                  <Button
                    onClick={() =>
                      dispatch(addCart({ productId: p._id }))
                    }
                    name="Add"
                    className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg text-sm"
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
