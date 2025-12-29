import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../service/api";


export const loginUser= createAsyncThunk("login/auth", async(data,{rejectWithValue})=>{
  try{
      
           const res= await API.post("/user/login",data)
           console.log("API RESPONSE 👉", res.data);
         return  res.data

  }catch(e){
return rejectWithValue(e.response?.data?.message || e.message);
  }
})
export const signupUser = createAsyncThunk("signup/user",(data, {rejectWithValue})=>{
  try{
     const res = API.post("/user/register",data)
     return res.data
  }catch(e){
    return rejectWithValue(e.response?.data?.message || e.message);
  }
})
export const logout = createAsyncThunk("logout/user", async( _, {rejectWithValue})=>{
    try{
  const res = await API.post("user/logout")
  return res.data
    } catch(e){
  return rejectWithValue(e.response?.data?.message || e.message);
    }
})