import { createSlice } from "@reduxjs/toolkit";
import { loginUser, saveProduct, signupUser, userData, } from "./authThunk";

const initialState = {
  users :[],
  save:[],
  user:JSON.parse(sessionStorage.getItem("user")) || null,
  loading: false,
  error: null,

};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout:(state) => {
      state.user = null;
      state.loading =false;
      state.error = null;
 

sessionStorage.removeItem("token")
    },
  },
  extraReducers: (builder) => {
    builder
      // Login Thunk
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
       sessionStorage.setItem("user", JSON.stringify(action.payload.user))
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Signup Thunk
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
            state.user = action.payload.user;sessionStorage.setItem("user",JSON.stringify(action.payload.user));  
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(userData.pending, (state)=>{
        state.loading= true
         state.error = null;
      })
      .addCase(userData.fulfilled,(state, action)=>{
        state.loading= false
          state.users= action.payload.users   
      })
      .addCase(userData.rejected, (state,action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(saveProduct.pending,(state)=>{
        state.loading = true
      })
     .addCase(saveProduct.fulfilled, (state, action) => {
        state.loading = false;

        // Backend returns updated user with populated saveItem
        state.user = action.payload;

        sessionStorage.setItem(
          "user",
          JSON.stringify(action.payload)
        );
      })
      .addCase(saveProduct.rejected,(state,action)=>{
          state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
