import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../service/api";


export const allProductShow= createAsyncThunk("product/show",async(_, {rejectWithValue})=>{
  try{
   let res=    await API.get("/product", )
   console.log(  "data of product",res.data)
    return res.data

  }catch(e){
return rejectWithValue(e.response?.data?.message || e.message);
  }
})
export const showOneProduct = createAsyncThunk(  "show/prduct",async(id ,{rejectWithValue})=>{
  try{
    let res= await API.get(`/product/${id}`)
     return res.data
  }catch(e){
  return rejectWithValue(e.response?.data?.message || e.message);
  }
})
export const addProduct =createAsyncThunk("add/product",async(data,{rejectWithValue})=>{
   try{
   const res= await API.post("/product/add",data)
   return res.data
   }catch(e){
   return rejectWithValue(e.response?.data?.message || e.message);
   }
})
export const updateProduct = createAsyncThunk('updata/prodcut',async(id,data,{rejectWithValue})=>{
   try{
   const res = await API.put(`/product/update/${id}`,data,);
   return res.data
   }catch(e){
     return rejectWithValue(e.response?.data?.message || e.message);
   }
});
export const deleteProduct= createAsyncThunk("product/delete",async(id,{rejectWithValue})=>{
try{
  const res= await API.delete(`/delete/${id}`,);
   return res.data;
}catch(e){
 return rejectWithValue(e.response?.data?.message || e.message);
}
})