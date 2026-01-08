import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../service/api";

// GET CART
export const getCart = createAsyncThunk("cart/get", async (_, { rejectWithValue }) => {
  try {
    const res = await API.get("/cart");
    return res.data;
  } catch (e) {
    return rejectWithValue(e.response?.data?.message || e.message);
  }
});

// ADD CART
export const addCart = createAsyncThunk("cart/add", async ({ productId }, { rejectWithValue }) => {
  try {
    const res = await API.post("/cart/add", { productId });
    return res.data;
  } catch (e) {
    return rejectWithValue(e.response?.data?.message || e.message);
  }
});

// REMOVE ITEM
export const removeSingleCart = createAsyncThunk("cart/remove", async (productId, { rejectWithValue }) => {
  try {
    const res = await API.delete(`/cart/delete/${productId}`);
    return res.data;
  } catch (e) {
    return rejectWithValue(e.response?.data?.message || e.message);
  }
});

// INCREASE QUANTITY
export const increaseQuantity = createAsyncThunk("cart/increase", async (productId, { rejectWithValue }) => {
  try {
    const res = await API.put(`/cart/increase/${productId}`);
    return res.data;
  } catch (e) {
    return rejectWithValue(e.response?.data?.message || e.message);
  }
});

// DECREASE QUANTITY
export const decreaseQuantity = createAsyncThunk("cart/decrease", async (productId, { rejectWithValue }) => {
  try {
    const res = await API.put(`/cart/decrease/${productId}`);
    return res.data;
  } catch (e) {
    return rejectWithValue(e.response?.data?.message || e.message);
  }
});
// APPLY DISCOUNT
export const discountCoupon = createAsyncThunk("cart/discount", async (couponCode, { rejectWithValue }) => {
  try {
    const res = await API.post("/cart/discount", { discountCode: couponCode });
    return res.data;
  } catch (e) {
    return rejectWithValue(e.response?.data?.message || e.message);
  }
});
