import React from "react";
import Card from "./Card";
export default function FilterProduct({ products,h1 }) {

  const filters = products.filter(p =>
    p.category.includes("food")
  );

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl text-black px-4 font-bold">{h1}</h1>

      <div><Card products={filters} name="Food"/>
      </div>
    </div>
  );
}
