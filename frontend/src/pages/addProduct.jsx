import React, { useState } from "react";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../features/product/productThunk";
import { useNavigate } from "react-router";
import { useCallback } from "react";


 const AddProduct= React.memo(()=>{
const dispatch= useDispatch()
const {loading , error} = useSelector(state=>state.products)
const navigate= useNavigate()
const [form, setForm] = useState({
  productName: "",
  productPrice: "",
  productImg: "",
  productDescription: "",
  productCategory: "",
  productUnit:""
});

const formHandle= useCallback((e)=>{
   const {name, value}= e.target
  setForm(prev=> ({...prev, [name]:value}))
},[])
console.log(form)

const formSubmit =useCallback(async(e)=>{
 e.preventDefault() 
 
const payload = {
  name: form.productName,
  price: Number(form.productPrice),
  image: form.productImg,
  description: form.productDescription,
  category: form.productCategory
}

try{
  await dispatch(addProduct(payload)).unwrap()
  console.log("add product")
  navigate("/")
}catch(e){
  console.log(e)
}
},[form,dispatch,navigate]) 


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={formSubmit} className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 space-y-5">
     {loading && (
  <p className="text-center text-blue-600 font-medium">
    Adding product...
  </p>
)}

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
          value={form.productName}
          name="productName"
           onChange={formHandle}
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
          value={form.productPrice}
          name="productPrice"
          onChange={formHandle}
            type="number"
            placeholder="Enter product price"
            className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
             <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Product unit
          </label>
          <input
          value={form.productUnit}
          name="productUnit"
          onChange={formHandle}
            type="number"
            placeholder="Enter product unit"
            className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
        {/* Product Image */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Product Image URL
          </label>
          <input
               value={form.productImg}
               onChange={formHandle}
               name="productImg"
            type="url"
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
          value={form.productDescription}
           onChange={formHandle}
           name="productDescription"
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
          <select  onChange={formHandle} value={form.productCategory} name="productCategory" className="w-full px-3 py-2 border rounded-lg cursor-pointer outline-none focus:ring-2 focus:ring-amber-400">
            <option >choose Category</option>
             <option value="food">food</option>
            <option value="clothes">Clothes</option>
            <option value="shoes">Shoes</option>
            <option value="electronics">Electronic Device</option>
            <option value="phone">Phone</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Button */}
        <Button type="submit"
          className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold transition-all"
         
        name={loading ? "Adding..." : "Add Product"}
        disabled={loading}
        />
        {error && (
  <p className="text-center text-red-600 font-medium">
    {error.message || "Something went wrong!"}
  </p>
)}
      </form>
    </div>
  );
})
export default AddProduct