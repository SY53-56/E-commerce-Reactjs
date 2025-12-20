import React from "react";
import Button from "../components/Button";

export default function AddProduct() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 space-y-5">
        
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-center text-gray-800">
          Add Product
        </h1>

        {/* Product Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            placeholder="Enter product name"
            className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        {/* Product Price */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Product Price
          </label>
          <input
            type="number"
            placeholder="Enter product price"
            className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        {/* Product Image */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Product Image URL
          </label>
          <input
            type="text"
            placeholder="Enter image URL"
            className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        {/* Product Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Product Description
          </label>
          <textarea
            rows="3"
            placeholder="Enter product description"
            className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-amber-400 resize-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Product Category
          </label>
          <select className="w-full px-3 py-2 border rounded-lg cursor-pointer outline-none focus:ring-2 focus:ring-amber-400">
            <option value="">Select category</option>
            <option value="clothes">Clothes</option>
            <option value="shoes">Shoes</option>
            <option value="electronics">Electronic Device</option>
            <option value="phone">Phone</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Button */}
        <Button
          className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold transition-all"
          name="Submit"
        />
      </form>
    </div>
  );
}
