import { createSlice } from "@reduxjs/toolkit";
import { getAllOrder, getCreateOrder, getSingleOrder, updataOrderStatus } from "./orderThunk";



const initialState = {
    orders:[],
     order:{},
     loading:false,
     error:null
     
}
const orderSlice = createSlice({
 name:"order",
 initialState,
   extraReducers:(builder)=>{
   builder.
   addCase(getCreateOrder.pending,(state) => { state.loading = true; state.error = null; })
   .addCase(getCreateOrder.fulfilled,(state ,action)=> {
 state.loading = false 
   state.order = action.payload.order
   })
   .addCase(getCreateOrder.rejected, (state, action) => {
     state.loading = false;
      state.error = action.payload; })
  .addCase(getAllOrder.pending,(state,) => { 
    state.loading = true;
     state.error = null;})
  .addCase(getAllOrder.fulfilled,(state, action) => {
    state.loading = false;
     state.orders= action.payload.orders; 
  })
  .addCase(getAllOrder.rejected, (state, action) => { 
    state.loading = false;
     state.error = action.payload})
      .addCase(getSingleOrder.pending,(state) => { 
    state.loading = true;
     state.error = null;})
  .addCase(getSingleOrder.fulfilled,(state, action) => {
    state.loading = false;
     state.order= action.payload.order; 
  })
  .addCase(getSingleOrder.rejected, (state, action) => { 
    state.loading = false;
     state.error = action.payload})
   .addCase(updataOrderStatus.pending ,(state,) => { 
    state.loading = true;
     state.error = null;})  
     .addCase(updataOrderStatus.fulfilled, (state ,action)=>{
        state.loading = false;
        state.order =action.payload.order
     })
       .addCase(updataOrderStatus.rejected, (state, action) => { 
    state.loading = false;
     state.error = action.payload})
}
})

export default orderSlice.reducer