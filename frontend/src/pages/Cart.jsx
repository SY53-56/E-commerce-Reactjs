import React from "react";
import Button from "../components/Button";

export default function Cart() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 lg:px-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center lg:text-left">
        Your Shopping Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product List */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Product Orders
          </h2>

          {/* Example product */}
          <div className="flex items-center justify-between border-b py-4">
            <div className="flex items-center gap-4">
              <img
                src="https://via.placeholder.com/80"
                alt="Product"
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  iPhone 14
                </h3>
                <p className="text-gray-500 text-sm">Qty: 1</p>
              </div>
            </div>
            <p className="font-bold text-gray-800">$799</p>
            
          </div>

          {/* Add more products here */}
          <div className="flex items-center justify-between border-b py-4">
            <div className="flex items-center gap-4">
              <img
                src="https://via.placeholder.com/80"
                alt="Product"
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  Samsung Galaxy
                </h3>
                <p className="text-gray-500 text-sm">Qty: 2</p>
              </div>
            </div>
            <p className="font-bold text-gray-800">$699</p>
          </div>

        </div>

        {/* Price Details */}
        <div className="w-full lg:w-96 bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-6">
          <h2 className="text-xl font-semibold border-b pb-3 text-gray-700">
            Price Details
          </h2>
          <div className="flex justify-between">
            <p className="text-gray-600">Price</p>
            <p className="font-semibold text-gray-800">$1497</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Discount</p>
            <p className="text-green-600 font-semibold">- $200</p>
          </div>
          <div className="flex justify-between border-b pb-3">
            <p className="text-gray-800 font-bold">Total Amount</p>
            <p className="text-gray-800 font-bold">$1297</p>
          </div>
          <p className="text-green-600 font-semibold">
            You will save $200 on this order
          </p>

          <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
