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
  status: "idle", // idle | loading | succeeded | failed
  page: 1,
  totalPages: 1,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* ================= ALL PRODUCTS ================= */
      .addCase(allProductShow.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
     .addCase(allProductShow.fulfilled, (state, action) => {
  state.status = "succeeded";
  if (action.payload.page === 1) {
    state.products = action.payload.products;
  } else {
    state.products.push(...action.payload.products);
  }
  state.page = action.payload.page;
  state.totalPages = action.payload.totalPages;
}) .addCase(allProductShow.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      /* ================= SINGLE PRODUCT ================= */
      .addCase(showOneProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(showOneProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentProduct = action.payload.product;
      })
      .addCase(showOneProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      /* ================= ADD PRODUCT ================= */
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload.product);
      })

      /* ================= UPDATE PRODUCT ================= */
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updated = action.payload.product;
        state.products = state.products.map((p) =>
          p._id === updated._id ? updated : p
        );
        if (state.currentProduct?._id === updated._id) {
          state.currentProduct = updated;
        }
      })

      /* ================= DELETE PRODUCT ================= */
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (p) => p._id !== action.payload._id
        );
        if (state.currentProduct?._id === action.payload._id) {
          state.currentProduct = null;
        }
      });
  },
});

export default productSlice.reducer;
