import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  addressList: [],
};

export const addNewAddress = createAsyncThunk(
  "/addressess/addNewAddress",
  async (formData) => {
    const { data } = await axios.post(
      "http://localhost:3000/api/shop/address/add",
      formData
    );
    return data;
  }
);

export const fetchAllAddress = createAsyncThunk(
  "/addressess/fetchAllAddress",
  async (userId) => {
    const { data } = await axios.get(
      `http://localhost:3000/api/shop/address/get/${userId}`
    );
    return data;
  }
);

export const editAddress = createAsyncThunk(
  "/addressess/editAddress",
  async ({ userId, addressId, formData }) => {
    const { data } = await axios.put(
      `http://localhost:3000/api/shop/address/update/${userId}/${addressId}`,
      formData
    );
    return data;
  }
);

export const deleteAddress = createAsyncThunk(
  "/addressess/deleteAddress",
  async ({ userId, addressId }) => {
    const { data } = await axios.delete(
      `http://localhost:3000/api/shop/address/delete/${userId}/${addressId}`
    );
    return data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
      })
      
      .addCase(fetchAllAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddress.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      })



      .addCase(editAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(editAddress.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      })



      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(deleteAddress.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      })
      ;
  },
});


export default addressSlice.reducer;
