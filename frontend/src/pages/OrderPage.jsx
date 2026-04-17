import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../context/themeContext';
import { useEffect } from 'react';
import { getAllOrder } from '../features/order/orderThunk';

export default function OrderPage() {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { orders, order } = useSelector((state) => state.order);


  console.log("order",order)
  useEffect(() => {
    dispatch(getAllOrder());
  }, [dispatch]);

  return (
    <div
      className={`min-h-screen px-4 md:px-10 lg:px-20 py-10 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <h1 className="text-3xl md:text-4xl font-bold mb-8">📦 My Orders</h1>

      
        <div className="grid gap-6">
       
            <div
              key={order._id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 hover:shadow-xl transition"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-2">
                <div>
                  <p className="text-sm opacity-60">
                    {new Date(order.createdAt).toDateString()}
                  </p>
                  <p className="text-xs opacity-50">Order ID: {order._id}</p>
                </div>

                <span className="w-fit px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                  {order.status}
                </span>
              </div>

              {/* Items */}
              <div className="space-y-3">
                {order.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 border-b pb-3 last:border-none"
                  >
                    <img
                      src={item.product.image[0]}
                      alt="product"
                      className="w-16 h-16 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm opacity-60">
                        {item.quantity} × ₹{item.product.price}
                      </p>
                    </div>

                    <p className="font-semibold">
                      ₹{item.quantity * item.product.price}
                    </p>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="mt-4 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>₹{order.totalAmount}</span>
                </div>

                <div className="flex justify-between text-red-500">
                  <span>Discount</span>
                  <span>- ₹{order.discountAmount || 0}</span>
                </div>

                <div className="flex justify-between font-bold text-green-600 text-lg">
                  <span>Final</span>
                  <span>₹{order.finalAmount}</span>
                </div>
              </div>

              {/* Address */}
              <div className="mt-4 text-sm opacity-70">
                📍 {order.address.gali}, {order.address.city},{' '}
                {order.address.state} - {order.address.pinCode}
              </div>
            </div>
          
        </div>
  
    </div>
  );
}

