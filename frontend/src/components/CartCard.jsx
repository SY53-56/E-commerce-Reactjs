import React from 'react'

const CartCard= React.memo(({item , handleDecreaseQuantity,handleIncreaseQuantity,handleRemoveCart})=>{

     return(
          <div
             
              className="flex  sm:flex-row bg-white items-center sm:items-start gap-4  p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow"
            >
              <img
                src={item.product.image[0]}
                alt={item.product.name}
                className="w-48 lg:w-28 h-28 object-cover rounded-xl flex-shrink-0"
              />
              <div className="flex-1 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                 <div className="flex lg:flex-col gap-2.5 lg:gap-1">
                   <h3 className="text-lg font-semibold text-gray-800">
                    {item.product.name}
                  </h3>
                  <p className="text-indigo-600 font-bold mt-1">₹{item.product.price}</p>

                 </div>
                  <div className="flex items-center gap-3 mt-3 text-black">
                    <button
                         type="button"
                      onClick={() => handleDecreaseQuantity(item.product._id)}
                      className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer transition"
                    >
                      −
                    </button>
                    <span className="font-semibold text-lg">{item.quantity}</span>
                    <button
                         type="button"
                      onClick={() => handleIncreaseQuantity(item.product._id)}
                      className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer transition"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex ls:flex-col items-end gap-8  lg:gap-6 mt-4 sm:mt-0">
                  <p className="text-gray-900 font-bold text-lg">
                    ₹{item.product.price * item.quantity}
                  </p>
                  <button
                  
           type="button"
                    onClick={() => handleRemoveCart(item.product._id)}
                    className="text-red-500 cursor-pointer hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
     )
}) 
export default CartCard