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
  cart: null,
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
      // GET CART
      .addCase(getCart.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(getCart.fulfilled, (state, action) => { state.loading = false; state.cart = action.payload.data; })
      .addCase(getCart.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // ADD CART
      .addCase(addCart.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(addCart.fulfilled, (state, action) => { state.loading = false; state.cart = action.payload.data; })
      .addCase(addCart.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // REMOVE ITEM
      .addCase(removeSingleCart.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(removeSingleCart.fulfilled, (state, action) => { state.loading = false; state.cart = action.payload.data; })
      .addCase(removeSingleCart.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // INCREASE
      .addCase(increaseQuantity.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(increaseQuantity.fulfilled, (state, action) => { state.loading = false; state.cart = action.payload.data; })
      .addCase(increaseQuantity.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // DECREASE
      .addCase(decreaseQuantity.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(decreaseQuantity.fulfilled, (state, action) => { state.loading = false; state.cart = action.payload.data; })
      .addCase(decreaseQuantity.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // DISCOUNT
      .addCase(discountCoupon.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(discountCoupon.fulfilled, (state, action) => { state.loading = false; state.cart = action.payload })
      .addCase(discountCoupon.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
