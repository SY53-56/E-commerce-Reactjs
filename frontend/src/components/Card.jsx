import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allProductShow } from '../features/product/productThunk'
import {Link} from "react-router-dom"
import Button from './Button'
export default function Card() {
  const dispatch = useDispatch()
  
  const { products, loading } = useSelector(
    state => state.products
  )

  useEffect(() => {
    dispatch(allProductShow())
  }, [dispatch])

  if (loading) {
    return (
      <p className="text-center text-lg font-semibold mt-10">
        Loading products...
      </p>
    )
  }


  return (
    <div className="px-6 py-8">
      {products.length === 0 ? (
        <p className="text-center text-2xl font-bold text-gray-500">
          There are no products
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(p => (
            <div
              key={p?._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col"
            >
              {/* Image */}
              <div className="w-full h-52 overflow-hidden rounded-lg">
              <Link to={`/product/${p._id}`}>
               <img
                  src={p?.image}
                  alt={p?.name}
                  className="w-full cursor-pointer h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </Link>
              </div>
  <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {p?.name}
                </h3>
              {/* Content */}
              <div className="mt-4 flex justify-between gap-1">
              

                <p className="text-green-600 font-bold text-lg">
                  ₹{p?.price}
                </p>
                <Button className="px-2 py-1  rounded-lg text-white bg-green-600" name="Add cart"/>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
