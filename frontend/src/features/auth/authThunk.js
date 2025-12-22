import {  createAsyncThunk } from "@reduxjs/toolkit";


import API from "../../service/api"

export const loginUSer= createAsyncThunk("login/auth", async(data,{rejectWithValue})=>{
  try{
      
           const res= await API.post("/user/login",data)
           console.log("API RESPONSE 👉", res.data);
         return  res.data

  }catch(e){
return rejectWithValue(e.response?.data?.message || e.message);
  }
})

export const signupUSer= createAsyncThunk("signup/auth",async(data,{rejectWithValue})=>{
  try{
   const res = await API.post("/user/register",data)
   console.log("API RESPONSE 👉", res.data);
   return res.data
  }catch(e){
return rejectWithValue(e.response?.data?.message || e.message);
  }
})
