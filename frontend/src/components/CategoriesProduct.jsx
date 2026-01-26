import React from 'react'
import { Link } from 'react-router-dom'

export default function CategoriesProduct({ category =[] }) {
  return (
    <section className="px-10 my-7">
      <h1 className="text-3xl font-bold mb-6">Most Popular Categories</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {category.map(item => (
          <div
            key={item}
            className="border w-96 h-80 rounded-md bg-amber-400 flex items-center justify-center"
          >
            <Link to={`/products/${item}`}>
              <button className="text-xl font-semibold capitalize">
                {item}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
