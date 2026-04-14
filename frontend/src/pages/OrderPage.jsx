import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrder } from '../features/order/orderThunk';
import { useTheme } from '../context/themeContext';

export default function OrderPage() {
  const dispatch = useDispatch();
  const { orders, order, loading, error } = useSelector((state) => state.order);
  const { theme } = useTheme();

  useEffect(() => {
    dispatch(getAllOrder());
  }, [dispatch]);
  
  
console.log("order",order)
console.log("orders",orders)
 { /*if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Loading orders...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className={`text-xl text-red-500`}>Error: {error}</p>
      </div>
    );
  }
 */}
  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className={`text-2xl mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            📦 No orders found
          </p>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            You haven't placed any orders yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-10 px-4 lg:px-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <h1 className={`text-4xl font-bold mb-10 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        📋 My Orders
      </h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className={`rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow ${
              theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            }`}
          >
            {/* Order Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
              <div>
                <h2 className="text-xl font-semibold">Order #{order._id.slice(-8)}</h2>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="mt-2 lg:mt-0">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === 'delivered'
                      ? 'bg-green-100 text-green-800'
                      : order.status === 'shipped'
                      ? 'bg-blue-100 text-blue-800'
                      : order.status === 'processing'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Items:</h3>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <img
                      src={item.product.image[0]}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.product.name}</p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        Quantity: {item.quantity} × ₹{item.product.price}
                      </p>
                    </div>
                    <p className="font-semibold">₹{item.product.price * item.quantity}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Footer */}
            <div className={`border-t pt-4 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex justify-between items-center">
                <div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Shipping Address: {order.address}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Total Amount
                  </p>
                  <p className="text-2xl font-bold text-green-600">₹{order.totalAmount}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
