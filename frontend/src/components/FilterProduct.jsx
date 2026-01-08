import React from "react";
import Card from "./Card";
export default function FilterProduct({ products,heading ,category }) {

  const filters = products.filter(p =>
    p.category.includes(category)
  ).slice(0, 4);

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl text-black px-4 font-bold">{heading}</h1>

      <div><Card products={filters} name="Food"/>
      </div>
    </div>
  );
}
