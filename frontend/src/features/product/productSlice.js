import { createSlice } from "@reduxjs/toolkit";
import {
  addProduct,
  allProductShow,
  deleteProduct,
  showOneProduct,
  updateProduct,
} from "./productThunk";

const initialState = {
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // 🔹 ALL PRODUCTS
      .addCase(allProductShow.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allProductShow.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products
      })
      .addCase(allProductShow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 SINGLE PRODUCT
      .addCase(showOneProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(showOneProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(showOneProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 ADD PRODUCT
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload.products);
        state.currentProduct = action.payload;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 UPDATE PRODUCT
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload.products

        state.products = state.products.map((p) =>
          p._id === updatedProduct._id ? updatedProduct : p
        );

        if (
          state.currentProduct &&
          state.currentProduct._id === updatedProduct._id
        ) {
          state.currentProduct = updatedProduct;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 DELETE PRODUCT
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        const deletedProduct = action.payload;

        state.products = state.products.filter(
          (p) => p._id !== deletedProduct._id
        );

        if (
          state.currentProduct &&
          state.currentProduct._id === deletedProduct._id
        ) {
          state.currentProduct = null;
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      });
  },
});

export default productSlice.reducer;
