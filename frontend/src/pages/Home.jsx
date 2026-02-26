import Poster from "../components/Poster";
import Button from "../components/Button";
import Card from "../components/Card";
import FilterProduct from "../components/FilterProduct";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import toast from "react-hot-toast";
import { Link, useNavigate, useOutletContext } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { allProductShow } from "../features/product/productThunk";
import { useTheme } from "../context/themeContext";
import CategoriesProduct from "../components/CategoriesProduct";
import debounce from "../uitiltes/uitiltes"
import { addCart } from "../features/cart/cartThunk";
import  { useCallback } from "react";
import { saveProduct } from "../features/auth/authThunk";
import UseProductActions from "../hooks/UseProductActions";
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const {handleAddToCart ,handleSave , isSavedId} = UseProductActions()

;

  const { products, status,  totalPages , loading } = useSelector((state) => state.products);
  const { user,users , } = useSelector((state) => state.auth);
  const {save}= useSelector(state=> state.auth)
 console.log("user",user)
  const [currentPage, setCurrentPage] = useState(1);
 console.log("hcgzhcjzjklz",products)
  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    dispatch(allProductShow({ page: currentPage , limit: 20 }));
  }, [dispatch, currentPage]);

console.log("sahul sacved" ,save)
 console.log("productsjdhjkdfjkd  12222", products)
console.log("usersdatabsndjds",users)
  useEffect(()=>{
    const handleScroll= ()=>{
      const bottom =  window.innerHeight+ window.scrollY>= document.documentElement.scrollHeight-200
   if (
        bottom &&
        status !== "loading" &&
        currentPage < totalPages
      ) {
        setCurrentPage((prev) => prev + 1);
      }
    }
    window.addEventListener("scroll",handleScroll)
    return ()=>window.removeEventListener("scroll",handleScroll)
  },[status, currentPage, totalPages])

  /* ================= GSAP ================= */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".section1", {
        scrollTrigger: {
          trigger: ".section1",
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 1.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

 

  const category = [
    {img:"https://www.bing.com/th/id/OIP.ORH_mwC_R1rP2xGViNy_lwHaE8?w=265&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2", cate:"clothes"},
    {  img:"https://www.bing.com/th/id/OIP.iZmRJpSySKsI7x8gUlTSyAHaEz?w=262&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" , cate:"food"},
    {img:"https://www.bing.com/th/id/OIP.3cIGk8wliMY7sK3HLnsZJgHaH6?w=181&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",cate:"electronics"},
    {img:"https://www.bing.com/th/id/OIP.agaM_r4qvG1OTLipo_yAOwHaHa?w=168&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2", cate:"toyes"}
  ]


 

  return (
    <>
      <div ref={containerRef}>
        {/* HERO */}
       
      
        {/*  <section className="section1 relative ">
          <Poster />
        </section>*/}
       <div className="mt-7 px-4 lg:px-24">
  <div className="w-full mx-auto">
    <img
      className="w-full h-60 lg:h-80 object-cover rounded-lg"
      src="https://images.unsplash.com/vector-1738237080330-b9d0755ede07?q=80&w=1074&auto=format&fit=crop"
      alt=""
    />
  </div>
</div>

<CategoriesProduct category={category}/>


        <section className="px-4 lg:px-20 py-10">
          <h2 className="text-3xl font-bold mb-4">🛍️ All Products</h2>
{Array.isArray(products) && products.length > 0 ? (
  loading ? <CardSkeleton/> : <Card products={products} user={user} addCart={handleAddToCart} loading={loading}
   onSave={handleSave} isSaveId={isSavedId} />
) : (
  <p>No product</p>
)}


          
        </section>

        {/* CATEGORIES */}
        <section className="px-4 lg:px-20 py-10">
          <h2 className="text-3xl font-bold mb-6">📂 Shop by Category</h2>
          <FilterProduct products={products} heading="Food" category="food" />
          <FilterProduct products={products} heading="Clothes" category="clothes" />
          <FilterProduct products={products} heading="Electronics" category="electronics" />
          <FilterProduct products={products} heading="Other" category="other" />
        </section>
      </div>

    
    </>
  );
}
