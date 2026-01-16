import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signupUser, } from "./authThunk";

const initialState = {
  user:JSON.parse(sessionStorage.getItem("user")) || null,
  loading: false,
  error: null,

};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
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
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
