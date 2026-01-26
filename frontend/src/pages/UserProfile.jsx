import React from 'react'
import { Link } from "react-router-dom";
export default function UserProfile() {
  return (




    <div className="bg-gray-50">
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Discover Products That Fit Your Lifestyle
          </h1>
          <p className="text-gray-600 text-lg">
            Shop the latest trends with unbeatable prices and fast delivery.
          </p>
          <div className="flex gap-4">
            <Link
              to="/shop"
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
            >
              Shop Now
            </Link>
            <Link
              to="/deals"
              className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
            >
              View Deals
            </Link>
          </div>
        </div>

        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
            alt="Hero"
            className="rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {['Electronics','Fashion','Shoes','Home','Beauty','Sports'].map(cat => (
            <div
              key={cat}
              className="bg-white p-4 rounded-xl text-center shadow hover:shadow-lg transition cursor-pointer"
            >
              <p className="font-semibold text-gray-800">{cat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
          <Link to="/shop" className="text-indigo-600 hover:underline">
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1,2,3,4].map(item => (
            <div key={item} className="bg-white rounded-2xl shadow hover:shadow-xl transition">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
                alt="Product"
                className="rounded-t-2xl h-48 w-full object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-gray-800">Product Name</h3>
                <p className="text-indigo-600 font-bold">₹1999</p>
                <button className="w-full mt-2 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-indigo-600 rounded-3xl p-10 text-white flex flex-col lg:flex-row justify-between items-center gap-6">
          <h2 className="text-3xl font-bold">Big Sale – Up to 50% Off</h2>
          <Link
            to="/shop"
            className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100"
          >
            Grab the Deal
          </Link>
        </div>
      </section>
    </div>
  );
}


