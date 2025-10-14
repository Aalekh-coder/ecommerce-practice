import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

export const registerUserService = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:3000/api/auth/register",
      formData,
      { withCredentials: true }
    );
    return response?.data;
  }
);

export const loginUserService = createAsyncThunk(
  "/auth/login",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:3000/api/auth/login",
      formData,
      { withCredentials: true }
    );
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
    extraReducers: (builder) => {
      builder
        .addCase(registerUserService.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(registerUserService.fulfilled, (state) => {
          state.isLoading = false;
          state.user = null;
          state.isAuthenticated = true;
        })
        .addCase(registerUserService.rejected, (state) => {
          state.isLoading = false;
          state.user = null;
          state.isAuthenticated = false;
        })
        .addCase(loginUserService.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(loginUserService.fulfilled, (state, action) => {
          console.log(action);
          state.isLoading = false;
          state.user = action?.payload?.user ? action?.payload?.user:null;
          state.isAuthenticated = action?.payload?.user ? true : false;
        })
        .addCase(loginUserService.rejected, (state) => {
          state.isLoading = false;
          state.user = null;
          state.isAuthenticated = false;
        });
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
