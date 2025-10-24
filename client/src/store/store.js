import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminProductSlice from "./admin/productSlice";
import shopProductSlice from "./shop/productSlice";
import shopCartSlice from "./shop/cartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProduct: adminProductSlice,
    shopProduct: shopProductSlice,
    shopCart: shopCartSlice,
  },
});

export default store;
