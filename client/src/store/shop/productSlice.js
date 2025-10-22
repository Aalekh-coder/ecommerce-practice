import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
};

export const fetchAllfilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({filterParams}) => {
    const response = await axios.get(
      "http://localhost:3000/api/shop/products/get"
    );
    return response.data;
  }
);
const shopProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllfilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllfilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload?.data;
      })
      .addCase(fetchAllfilteredProducts.rejected, (state) => {
        state.isLoading = true;
        state.productList = [];
      });
  },
});

export default shopProductSlice.reducer
