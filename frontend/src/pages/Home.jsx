import Poster from '../components/Poster'
import Button from '../components/Button'
import Card from '../components/Card'
import FilterProduct from '../components/FilterProduct'

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { useOutletContext } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useLayoutEffect, useRef } from 'react'
import { allProductShow } from '../features/product/productThunk'

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);

  const { products } = useSelector((state) => state.products)
  const dispatch = useDispatch()
  const searchText = useOutletContext()

  useEffect(() => {
    dispatch(allProductShow())
  }, [dispatch])

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
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <>
      <div ref={containerRef}>
        <div className="section1">
          <Poster />
          <Card searchText={searchText} products={products} />
        </div>

        <div>
         <FilterProduct products={products} heading="Food" category="food" />
          <FilterProduct products={products} heading="Clothes" category="clothes" />
          <FilterProduct products={products} heading="Other" category="other" />
        </div>
      </div>

      <Button
        to="/add"
        className="bg-lime-700 text-white"
        name="add button"
      />
    </>
  );
}
