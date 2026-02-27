import React, { useState, useEffect , useMemo} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import FilterProduct from "../components/FilterProduct";
import { allProductShow } from "../features/product/productThunk";
import UseProductActions from "../hooks/UseProductActions";
export default function ProductsCategoryPage() {
  const { products = [] } = useSelector((state) => state.products);
  const { category } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
const {  handleAddToCart } = UseProductActions();
  const [filters, setFilters] = useState({
    category: category || "",
    minPrice: 0,
    maxPrice: 10000,
    page: 1,
    limit: 20,
  });

  const categories = ["clothes", "food", "electronics", "game", "others"];

  // 🔥 API CALL (Amazon Style)
  useEffect(() => {
    dispatch(allProductShow(filters));
  }, [filters, dispatch]);

  // Category Change
  const handleCategoryChange = (cat) => {
    setFilters((prev) => ({
      ...prev,
      category: cat === "all" ? "" : cat,
      page: 1,
    }));


    if (cat === "all") {
      navigate("/products");
    } else {
      navigate(`/products/${cat}`);
    }
  };
const filteredProducts = useMemo(() => {
  if (!filters.category) return products;

  return products.filter(
    (p) => p.category === filters.category 
  );
}, [products, filters.category]);

  // Price Change (trigger API immediately)
  const handlePrice = (e) => {
    const value = Number(e.target.value);

    setFilters((prev) => ({
      ...prev,
      minPrice: 0,
      maxPrice: value,
      page: 1,
    }));
  };

  return (
<div className="px-4 lg:px-10 py-8">
  <div className="flex flex-col  lg:flex-row gap-8">

    {/* Sidebar */}
    <aside className="lg:w-1/4 w-full ml-10">
      <FilterProduct
        category={categories}
        onSelect={handleCategoryChange}
        onChange={handlePrice}
        value={filters.maxPrice}
       
      />
    </aside>

    {/* Products Section */}
    <main className="w-full">
      <Card products={filteredProducts} className="grid grid-1 lg:grid-cols-2"  addCart={handleAddToCart} />
    </main>

  </div>
</div>
  );

}