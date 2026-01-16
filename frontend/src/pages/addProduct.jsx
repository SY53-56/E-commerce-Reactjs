import React, { useState, useCallback, useMemo } from "react";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../features/product/productThunk";
import { useNavigate } from "react-router";

const AddProduct = React.memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.products);

  const [form, setForm] = useState({
    productName: "",
    productPrice: "",
    productDescription: "",
    productCategory: "",
    productUnit: "",
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
      formData.append("unit", form.productUnit);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <form
        onSubmit={formSubmit}
        className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8 space-y-6"
      >
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-4">
          Add Product
        </h1>

        {loading && <p className="text-center text-blue-600 font-medium">Adding product...</p>}

        {/* Product Name */}
        <Input label="Product Name" name="productName" value={form.productName} onChange={formHandle} />

        {/* Product Price */}
        <Input label="Product Price" name="productPrice" type="number" value={form.productPrice} onChange={formHandle} />

        {/* Product Unit */}
        <Input label="Product Unit" name="productUnit" value={form.productUnit} onChange={formHandle} />

        {/* Product Images */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Product Images</label>
          <input
            type="file"
            multiple
            onChange={handleFile}
            className="w-full px-3 py-2 h-12 border rounded-xl outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
          />
          <p className="text-xs text-gray-500 mt-1">Max 5 images allowed</p>
          <div className="flex gap-2 mt-2 flex-wrap">
            {filePreviews.map((file) => (
              <div key={file.id} className="w-20 h-20 border rounded-lg overflow-hidden relative">
                <img src={file.url} alt="preview" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
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
          name={loading ? "Adding..." : "Add Product"}
          className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold transition"
          disabled={loading}
        />

        {error && <p className="text-center text-red-600 font-medium">{error.message || "Something went wrong!"}</p>}
      </form>
    </div>
  );
});

export default AddProduct;

// ================= REUSABLE INPUT COMPONENTS =================
const Input = React.memo(({ label, name, value, onChange, type = "text" }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-semibold text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-amber-400 transition"
    />
  </div>
));

const TextArea = React.memo(({ label, name, value, onChange }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-semibold text-gray-700">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows="4"
      className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-amber-400 resize-none transition"
    />
  </div>
));

const Select = React.memo(({ label, name, value, onChange, options }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-semibold text-gray-700">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border rounded-xl cursor-pointer outline-none focus:ring-2 focus:ring-amber-400 transition"
    >
      <option value="">Choose Category</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt.charAt(0).toUpperCase() + opt.slice(1)}
        </option>
      ))}
    </select>
  </div>
));
