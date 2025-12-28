import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { showOneProduct } from '../features/product/productThunk';
import Button from '../components/Button';

export default function ProductPage() {
  const dispatch = useDispatch();
  const { currentProduct, status, error, products } = useSelector(state => state.products);
  const { id } = useParams();
  const [filterData, setFilterData] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) dispatch(showOneProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentProduct && products) {
      const data = products.filter(p =>
        p.title?.toLowerCase().includes(currentProduct.product.title?.toLowerCase()) ||
        p.category?.toLowerCase().includes(currentProduct.product.category?.toLowerCase())
      ).filter(p => p._id !== currentProduct.product._id); // exclude current product
      setFilterData(data);
    }
  }, [currentProduct, products]);

  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  if (status === 'loading') return <p className="text-center mt-20 text-gray-500">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;
  if (!currentProduct) return <p className="text-center mt-20 text-gray-500">No product found</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-200 py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Product Details */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row gap-10 p-6 lg:p-12">
          <div className="lg:w-1/2 flex items-center justify-center bg-gray-50 rounded-xl p-6 hover:shadow-xl transition-shadow duration-300">
            <img
              className="object-contain w-full h-80 lg:h-[450px] transition-transform duration-300 hover:scale-105 rounded-xl"
              src={currentProduct.product.image}
              alt={currentProduct.product.title}
            />
          </div>
          <div className="lg:w-1/2 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{currentProduct.product.title}</h1>
              <p className="text-gray-700 mb-6">{currentProduct.product.description}</p>
              <h2 className="text-3xl font-bold text-indigo-600 mb-6">${currentProduct.product.price}</h2>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={handleDecrease}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition-all duration-300"
              >-</button>
              <span className="text-xl font-semibold">{quantity}</span>
              <button
                onClick={handleIncrease}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition-all duration-300"
              >+</button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-all duration-300"
                name="Add to Cart"
              />
              <Button
                className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-semibold py-3 px-8 rounded-xl shadow-lg transition-all duration-300"
                name="Buy Now"
              />
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          {filterData.length === 0 ? (
            <p className="text-center text-gray-500">No related products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filterData.map(p => (
                <div key={p._id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col">
                  <div className="w-full h-52 overflow-hidden rounded-lg">
                    <Link to={`/product/${p._id}`}>
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                      />
                    </Link>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mt-4 truncate">{p.title}</h3>
                  <p className="text-green-600 font-bold text-lg mt-2">${p.price}</p>
                  <Button
                    className="mt-2 px-2 py-1 rounded-lg text-white bg-green-600 hover:bg-green-700"
                    name="Add Cart"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
