import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
};

export const fetchAllfilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });
    const response = await axios.get(
      `http://localhost:3000/api/shop/products/get?${query}`
    );
    return response.data;
  }
);

export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails",
  async (id) => {
    const response = await axios.get(
      `http://localhost:3000/api/shop/products/get/${id}`
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
      })

      // for fetching  product details

      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload?.data;
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.isLoading = true;
        state.productDetails = null;
      });
  },
});

export default shopProductSlice.reducer;
