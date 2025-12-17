import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../src/features/auth/authSlice"

export const store = configureStore({
    reducer:{
  auth:authSlice
    }
    
})