import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../service/api";


export const getCreateOrder = createAsyncThunk("/order" , async( address , { rejectWithValue })=>{
 try{
     const response =await API.post("/order",address)
     return response.data
 }catch(e){
        return rejectWithValue(e.response?.data?.message || e.message);
 }
})
export const getAllOrder = createAsyncThunk("/allorder" , async( _ , { rejectWithValue })=>{
 try{
     const response =await API.get(`/order/allorder`)
     console.log( "sahul",response.data)
     return response.data
 }catch(e){
        return rejectWithValue(e.response?.data?.message || e.message);
 }
})
export const getSingleOrder = createAsyncThunk("/singleorder" , async( orderId , { rejectWithValue })=>{
 try{
     const response =await API.get(`/order/singleOrder/${orderId}`)
        console.log(response.data)
     return response.data
 }catch(e){
        return rejectWithValue(e.response?.data?.message || e.message);
 }
})
export const updataOrderStatus = createAsyncThunk("/orderstatus" , async({ orderId , status}, { rejectWithValue })=>{
 try{
     const response =await API.post(`/order/${orderId}`, {status})
        console.log(response.data)
     return response.data
 }catch(e){
        return rejectWithValue(e.response?.data?.message || e.message);
 }
})