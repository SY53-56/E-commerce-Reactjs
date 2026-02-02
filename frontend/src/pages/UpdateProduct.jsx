import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import Select from "../components/Select";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { updateProduct } from "../features/product/productThunk";

export default function UpdateProduct() {
  const { currentProduct, status, error } = useSelector(state => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    productName: "",
    productPrice: "",
    productStock: "",
    productCategory: "",
    productUnit: "",
    productDescription: "",
    productBrand: "",
    existingImages: [],
    newImages: [],
  });

  // Sync Redux product when it loads
  useEffect(() => {
    if (currentProduct?._id) {
      setForm({
        productName: currentProduct.name || "",
        productPrice: currentProduct.price || "",
        productStock: currentProduct.stock || "",
        productCategory: currentProduct.category || "",
        productUnit: currentProduct.unit || "",
        productDescription: currentProduct.description || "",
        productBrand: currentProduct.brand || "",
        existingImages: Array.isArray(currentProduct.image) ? currentProduct.image : [],
        newImages: [],
      });
    }
  }, [currentProduct]);

  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    setForm(prev => ({
      ...prev,
      newImages: Array.from(e.target.files),
    }));
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.productName);
    formData.append("price", form.productPrice);
    formData.append("stock", form.productStock);
    formData.append("category", form.productCategory);
    formData.append("unit", form.productUnit);
    formData.append("description", form.productDescription);
    formData.append("brand", form.productBrand);

   
    if (Array.isArray(form.newImages)) {
    form.newImages.forEach(file => formData.append("images", file));
  }

    try {
      await dispatch(updateProduct({ id: currentProduct._id, data: formData })).unwrap();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  if (!currentProduct) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4 py-10">
      <form onSubmit={formSubmit} className="w-full max-w-lg bg-[#0f172a] border border-gray-700 rounded-2xl shadow-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-amber-400">Update Product</h1>
        <p className="text-center text-gray-400 text-sm">Fill product details below</p>

        <Input label="Product Name" name="productName" value={form.productName} onChange={handleForm} />
        <div className="flex gap-4">
          <Input label="Product Price" name="productPrice" type="number" value={form.productPrice} onChange={handleForm} />
          <Input label="Product Unit" name="productUnit" value={form.productUnit} onChange={handleForm} />
        </div>
        <div className="flex gap-4">
          <Input label="Product Brand" name="productBrand" value={form.productBrand} onChange={handleForm} />
          <Input label="Product Stock" name="productStock" type="number" value={form.productStock} onChange={handleForm} />
        </div>

        <Input label="Add New Images" type="file" multiple onChange={handleFile} />
        <div className="flex gap-3 flex-wrap mt-2">
          {form.existingImages.map((img, i) => (
            <img key={i} src={img} alt="existing" className="w-20 h-20 object-cover rounded border" />
          ))}
        </div>

        <TextArea label="Description" name="productDescription" value={form.productDescription} onChange={handleForm} />
        <Select label="Category" name="productCategory" value={form.productCategory} options={["food","clothes","shoes","electronics","phone","other"]} onChange={handleForm} />

        <Button type="submit" name={status==="loading"?"Updating...":"Update Product"} className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold transition" disabled={status==="loading"} />

        {error && <p className="text-center text-red-600 font-medium">{error.message || "Something went wrong!"}</p>}
      </form>
    </div>
  );
}
