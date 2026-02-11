import React from "react";
import { useSelector } from "react-redux";
import Card from "../components/Card";

export default function SaveProductPage() {
  const { user } = useSelector((state) => state.auth);

  const savedProducts = user?.saveItem || [];

  return (
    <div className="my-10 flex flex-col w-full px-12 lg:px-20">
      <h1 className="text-4xl mb-9 lg:text-5xl font-bold text-center">
        Your Saved Products
      </h1>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {savedProducts.length > 0 ? (
          <Card products={savedProducts} user={user} />
        ) : (
          <p className="text-3xl font-bold text-center">
            There are no saved products
          </p>
        )}
      </div>
    </div>
  );
}
