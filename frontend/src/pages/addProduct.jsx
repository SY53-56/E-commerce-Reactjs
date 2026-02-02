import React, { useState, useCallback, useMemo } from "react";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../features/product/productThunk";
import { useNavigate } from "react-router";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import Select from "../components/Select"
const AddProduct = React.memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.products);

  const [form, setForm] = useState({
    productName: "",
    productPrice: "",
    productDescription: "",
    productCategory: "",
    productUnit: "",
    productBrand:"",
    productStock:""
  });

  const [files, setFiles] = useState([]);

  // ================= FORM HANDLER =================
  const formHandle = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  // ================= FILE HANDLER =================
  const handleFile = useCallback((e) => {
    const selected = Array.from(e.target.files).slice(0, 5);
    setFiles(selected);
  }, []);

  // ================= FILE PREVIEWS =================
  const filePreviews = useMemo(
    () =>
      files.map((file, idx) => ({
        id: idx,
        url: URL.createObjectURL(file),
      })),
    [files]
  );

 

  // ================= FORM SUBMIT =================
  const formSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!form.productName || !form.productPrice || !form.productCategory) {
        alert("Please fill all required fields!");
        return;
      }

      const formData = new FormData();
      formData.append("name", form.productName);
      formData.append("price", Number(form.productPrice));
      formData.append("description", form.productDescription);
      formData.append("category", form.productCategory);
      formData.append("brand", form.productBrand);
      formData.append("unit", form.productUnit);
      formData.append("stock", form.productStock);
      files.forEach((file) => formData.append("image", file));

      try {
        await dispatch(addProduct(formData)).unwrap();
        navigate("/");
      } catch (err) {
        console.error(err);
      }
    },
    [form, files, dispatch, navigate]
  );

  return (
  <div className="min-h-screen flex items-center justify-center 
bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4 py-10">
<form
  onSubmit={formSubmit}
  className="w-full max-w-lg bg-[#0f172a] border border-gray-700 
  rounded-2xl shadow-2xl p-8 space-y-6"
>

      <h1 className="text-3xl font-bold text-center text-amber-400">
  Add Product
</h1>
<p className="text-center text-gray-400 text-sm">
  Fill product details below
</p>

      <Input label="product name"  value={form.productName} onChange={formHandle} name="productName" />

        {/* Product Price */}
      <div className="flex gap-4">
          <Input label="Product Price"  name="productPrice" type="number" value={form.productPrice} onChange={formHandle} />

        {/* Product Unit */}
           <Input label="Product Unit" name="productUnit" value={form.productUnit} onChange={formHandle} />
      </div>

      <div className="flex gap-4">
        
              <Input label="Product Brand" name="productBrand" value={form.productBrand} onChange={formHandle} />
                            <Input label="Product stock" name="productStock" type="number" value={form.productStock} onChange={formHandle} />
      </div>
        {/* Product Images */}
      <div className="flex flex-col gap-1">
  <label className="text-sm font-medium text-gray-300">
    Product Images
  </label>

  <input
    type="file"
    multiple
    onChange={handleFile}
    className="w-full px-4 py-2 bg-gray-900 text-white
    border border-gray-700 rounded-lg cursor-pointer
    focus:ring-2 focus:ring-amber-400"
  />

  <p className="text-xs text-gray-400">Max 5 images allowed</p>
</div>

          <div className="flex gap-2 mt-2 flex-wrap">
            {filePreviews.map((file) => (
              <div key={file.id} className="w-20 h-20 border rounded-lg overflow-hidden relative">
                <img src={file.url} alt="preview" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
  

        {/* Product Description */}
        <TextArea label="Description" name="productDescription" value={form.productDescription} onChange={formHandle} />

        {/* Category */}
        <Select
          label="Category"
          name="productCategory"
          value={form.productCategory}
          onChange={formHandle}
          options={["food", "clothes", "shoes", "electronics", "phone", "other"]}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          name={status ==="loading" ? "Adding..." : "Add Product"}
          className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold transition"
          disabled={status}
        />

        {error && <p className="text-center text-red-600 font-medium">{error.message || "Something went wrong!"}</p>}
      </form>
    </div>
  );
});

export default AddProduct;

// ================= REUSABLE INPUT COMPONENTS =================




