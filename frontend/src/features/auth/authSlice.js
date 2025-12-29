import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signupUser, } from "./authThunk";

const initialState = {
  user: null,
  loading: false,
  error: null,
  token:null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.loading =false;
      state.error = null;


localStorage.removeItem("token")
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
        state.token= action.payload.token
        localStorage.setItem('token',action.payload.token)
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
              state.token= action.payload.token
               localStorage.setItem('token',action.payload.token)
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
