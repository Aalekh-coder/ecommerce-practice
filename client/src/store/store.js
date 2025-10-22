import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminProductSlice from "./admin/productSlice";
import shopProductSlice from "./shop/productSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProduct: adminProductSlice,
    shopProduct: shopProductSlice,
  },
});

export default store;
