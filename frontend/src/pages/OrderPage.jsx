import { useSelector } from 'react-redux';
import { useTheme } from '../context/themeContext';
export function OrderPage() {
  const { theme } = useTheme();
  const {orders , order}= useSelector(state=> state.order)
console.log( "orders",orders)
 console.log(  "order",order)
  const orderss = [
    {
      _id: '12345678',
      createdAt: new Date(),
      status: 'placed',
      totalAmount: 1200,
      address: { gali: 'Street 1', city: 'Ranchi', state: 'Jharkhand', pinCode: '825407' },
      items: [
        { product: { name: 'Product 1', price: 400, image: ['https://via.placeholder.com/150'] }, quantity: 2 }
      ]
    }
  ];

  return (
    <div className={`min-h-screen px-4 lg:px-20 py-10 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
      <h1 className="text-3xl md:text-4xl font-bold mb-8">📦 My Orders</h1>

      <div className="space-y-6">
     
          <div key={order._id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm opacity-60">{new Date(order.createdAt).toDateString()}</p>
              </div>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">{order.status}</span>
            </div>

            {order.items.map((item, i) => (
              <div key={i} className="flex items-center gap-4 border-b py-3">
                <img src={item.product.image[0]} className="w-16 h-16 rounded-lg" />
                <div className="flex-1">
                  <p>{item.product.name}</p>
                  <p className="text-sm opacity-60">{item.quantity} × ₹{item.product.price}</p>
                </div>
                <p className="font-semibold">₹{item.quantity * item.product.price}</p>
              </div>
            ))}

            <div className="flex justify-between items-center mt-4">
              <p className="text-sm opacity-60">
                {order.address.gali}, {order.address.city}
              </p>
              <p className="text-xl font-bold text-green-600">₹{order.totalAmount}</p>
            </div>
          </div>
        
      </div>
    </div>
  );
}