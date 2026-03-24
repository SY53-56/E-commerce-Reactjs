import React, { memo, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import Button from "./Button";

function FilterProduct({
  category = [],
  onSelect,
  onChange,
  value,
}) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [showFilter, setShowFilter] = useState(window.innerWidth>728);

  if (!Array.isArray(category)) return null;

  const handleCategoryClick = (item) => {
    setActiveCategory(item);
    onSelect?.(item);
  };

  useEffect(()=>{
     if(window.innerWidth >=728 ){
      setShowFilter(true)
     }else{
      setShowFilter(false)
     }
  },[showFilter])


  const toggleFilter = () => {
    setShowFilter((prev) => !prev);
    
  };

  return (
    <aside className="w-full lg:w-80 bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      
      {/* Toggle Header */}
  <div  className="w-full flex justify-between items-center text-xl font-bold text-gray-800 dark:text-white mb-6">
      <h1> Filter Products</h1>
      <button
        onClick={toggleFilter}
       
      >
        <ChevronDown
          className={`transition-transform duration-300 lg:hidden ${
            showFilter ? "rotate-180" : ""
          }`}
        />
      </button>

  </div>
      {/* Animated Content */}
      <div
        className={`transition-all duration-500 overflow-hidden ${
          showFilter ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {/* Categories */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Categories
          </p>

          <div className="flex flex-col gap-3">
            {category.map((item) => (
              <Button
                key={item}
                onClick={() => handleCategoryClick(item)}
                className={`text-left px-4 py-2 rounded-lg transition-all duration-200
                  ${
                    activeCategory === item
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
                  }`}
                name={item}
              />
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div className="mt-8">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Price Range
          </p>

          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
            <span>₹1</span>
            <span className="font-semibold text-blue-600">₹{value}</span>
            <span>₹50,000</span>
          </div>

          <input
            type="range"
            min={1}
            max={50000}
            value={value}
            onChange={onChange}
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>
      </div>
    </aside>
  );
}

export default memo(FilterProduct)