import Poster from "../components/Poster";
import Button from "../components/Button";
import Card from "../components/Card";
import FilterProduct from "../components/FilterProduct";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useOutletContext } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { allProductShow } from "../features/product/productThunk";
import { useTheme } from "../context/themeContext";
import CategoriesProduct from "../components/CategoriesProduct";


gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const searchText = useOutletContext();
 const [apiDAta, setApiData]= useState([])
  const { products, status,  totalPages } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
 console.log("user",user)
  const [currentPage, setCurrentPage] = useState(1);
 console.log("hcgzhcjzjklz",products)
  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    dispatch(allProductShow({ page: currentPage , limit: 20 }));
  }, [dispatch, currentPage]);

 

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
console.log(products)
  /* ================= SEARCH ================= */
  //const filteredProducts = products?.filter((p) =>p.name?.toLowerCase().includes(searchText?.toLowerCase() || ""));
 // console.log(filteredProducts)
  return (
    <>
      <div ref={containerRef}>
        {/* HERO */}
        <section className="section1">
          <Poster />
        </section>

        {/* PRODUCTS */}

<CategoriesProduct/>

        <section className="px-4 lg:px-20 py-10">
          <h2 className="text-3xl font-bold mb-4">🛍️ All Products</h2>
{Array.isArray(products) && products.length > 0 ? (
  <Card products={products} user={user}/>
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
