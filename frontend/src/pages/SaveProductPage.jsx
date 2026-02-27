import React from "react";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import UseProductActions from "../hooks/UseProductActions";

export default function SaveProductPage() {
  const {handleSave, handleAddToCart} = UseProductActions()
  const { user } = useSelector((state) => state.auth);

  const savedProducts = user?.saveItem || [];

  return (
    <div className="my-10 flex flex-col w-full px-12 lg:px-20">
      <h1 className="text-4xl mb-9 lg:text-5xl font-bold text-center">
        Your Saved Products
      </h1>

      <div className="w-full">
        {savedProducts.length > 0 ? (
          <Card products={savedProducts} user={user} addCart={handleAddToCart} onSave={handleSave}/>
        ) : (
          <p className="text-3xl font-bold text-center">
            There are no saved products
          </p>
        )}
      </div>
    </div>
  );
}
