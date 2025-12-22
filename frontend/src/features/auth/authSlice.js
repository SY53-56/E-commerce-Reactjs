import { createSlice } from "@reduxjs/toolkit";
import { loginUSer, signupUSer } from "./authThunk";

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
      state.token= null
localStorage.removeItem("token")
    },
  },
  extraReducers: (builder) => {
    builder
      // Login Thunk
      .addCase(loginUSer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUSer.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token= action.payload.token
        localStorage.setItem('token',action.payload.token)
      })
      .addCase(loginUSer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Signup Thunk
      .addCase(signupUSer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUSer.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
              state.token= action.payload.token
               localStorage.setItem('token',action.payload.token)
      })
      .addCase(signupUSer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
