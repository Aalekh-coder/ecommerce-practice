import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/addNewProduct",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:3000/api/admin/products/add",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }
);

export const fetchAllProduct = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const response = await axios.get(
      "http://localhost:3000/api/admin/products/get"
    );
    return response.data;
  }
);

export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({id, formData}) => {
    const response = await axios.put(
      `http://localhost:3000/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:3000/api/admin/products/delete/${id}`
    );
    return response?.data;
  }
);

const AdminProductSlice = createSlice({
  name: "adminProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProduct.rejected, (state) => {
        state.isLoading = true;
        state.productList = [];
      });
  },
});

export default AdminProductSlice.reducer;
