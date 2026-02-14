import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/themeContext'

export default function CategoriesProduct({ category = [] }) {
  const {theme} = useTheme()
  return (
    <section className="px-6 md:px-20 my-12">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Most Popular Categories
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {category.map(item => (
          <Link
            key={item.cate}
            to={`/products/${item.cate}`}
            className="group"
          >
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
              
              {/* Image */}
              <div className="h-40 flex items-center justify-center bg-gray-100">
                <img
                  src={item.img}
                  alt={item.cate}
                  className="h-24 object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Label */}
              <div className={`py-3 text-center delay-150 font-semibold capitalize ${theme ==="light"?"bg-indigo-600":"bg-amber-400"}  text-white`}>
                {item.cate}
              </div>

            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
