import { createSlice } from "@reduxjs/toolkit";
import {
  getCart,
  addCart,
 removeSingleCart,
  increaseQuantity,
  decreaseQuantity,
discountCoupon,
} from "./cartThunk";

const initialState = {
  cart: null,        // full cart object
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart(state) {
      state.cart = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ================= GET CART ================= */
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.data;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= ADD CART ================= */
      .addCase(addCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.data;
      })
      .addCase(addCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= REMOVE ITEM ================= */
      .addCase(removeSingleCart.fulfilled, (state, action) => {
        state.cart = action.payload.data;
      })

      /* ================= INCREASE ================= */
      .addCase(increaseQuantity.fulfilled, (state, action) => {
        state.cart = action.payload.data;
      })

      /* ================= DECREASE ================= */
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        state.cart = action.payload.data;
      })

      /* ================= APPLY COUPON ================= */
      .addCase(discountCoupon.fulfilled, (state, action) => {
        state.cart = action.payload.data;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
