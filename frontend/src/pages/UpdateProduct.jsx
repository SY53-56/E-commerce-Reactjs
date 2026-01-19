import React from 'react'
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import Select from "../components/Select"
export default function UpdateProduct() {
  return (
  <div className="min-h-screen flex items-center justify-center 
bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4 py-10">
<form
  onSubmit={formSubmit}
  className="w-full max-w-lg bg-[#0f172a] border border-gray-700 
  rounded-2xl shadow-2xl p-8 space-y-6"
>

      <h1 className="text-3xl font-bold text-center text-amber-400">
   Updata Product
</h1>
<p className="text-center text-gray-400 text-sm">
  Fill product details below
</p>

      <Input label="product name"   />

        {/* Product Price */}
      <div className="flex gap-4">
          <Input label="Product Price" className="text-w" name="productPrice" type="number"  />

        {/* Product Unit */}
           <Input label="Product Unit" name="productUnit"  />
      </div>

      <div className="flex gap-4">
        
              <Input label="Product Brand" name="productBrand"/>
                            <Input label="Product stock" name="productStock" type="number"  />
      </div>
        {/* Product Images */}
      <Input  label="Product Image" name="productImage"  />

         
  

        {/* Product Description */}
        <TextArea label="Description" name="productDescription" />

        {/* Category */}
        <Select
          label="Category"
          name="productCategory"
        
          options={["food", "clothes", "shoes", "electronics", "phone", "other"]}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          name={loading ? "Adding..." : "Add Product"}
          className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold transition"
          disabled={loading}
        />

        {error && <p className="text-center text-red-600 font-medium">{error.message || "Something went wrong!"}</p>}
      </form>
    </div>
  )
}
