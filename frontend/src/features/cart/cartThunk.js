import { createAsyncThunk } from "@reduxjs/toolkit";
import API from  "../../service/api"
export const getCart = createAsyncThunk("cart/user",async(_,{rejectWithValue})=>{
     try{
          const res  =await  API.get("/cart")
          return res.data
     }catch(e){
        return rejectWithValue(e.response?.data?.message || e.message);
     }
})

export const addCart =createAsyncThunk("cart/add",async({productId, quantity},{rejectWithValue})=>{
    try{
           const res = await API.post("/cart/add",{productId ,quantity})
           return res.data
    }catch(e){
        return rejectWithValue(e.response?.data?.message)
    }
})
export const removeSingleCart= createAsyncThunk("cart/remove",async(id,rejectWithValue)=>{
    try{
  const res = await API.put(`/cart/delete/${id}`)
  return res.data
    }catch(e){
        return rejectWithValue(e.message?.data.message)
    }
})
export const increaseQuantity = createAsyncThunk("cart/increase",async(id,{rejectWithValue})=>{
    try{
   const res = await API.put(`/cart/increase/${id}`)
   return res.data
    }catch(e){
return rejectWithValue(e.message?.data.message)
    }
})
export const decreaseQuantity = createAsyncThunk("cart/decrease",async(id,{rejectWithValue})=>{
    try{
   const res = await API.put(`/cart/decrease/${id}`)
   return res.data
    }catch(e){
return rejectWithValue(e.message?.data.message)
    }
})
export const discountCoupon= createAsyncThunk("discount/coupon",async(couponCode,{rejectWithValue})=>{
    try{
      const res = await API.post(`/cart/discount`,couponCode)
     return res.data
    }catch(e){
        return rejectWithValue(e.message?.data.message)
    }
})