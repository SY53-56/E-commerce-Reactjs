import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../src/features/auth/authSlice"
import productSlice from "../src/features/product/productSlice"
import cartSlice from "../src/features/cart/cartSlice"
export const store = configureStore({
    reducer:{
  auth:authSlice,
  products:productSlice,
  cart:cartSlice
    }
    
})