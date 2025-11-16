import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminProductSlice from "./admin/productSlice";
import adminOrderSlice from "./admin/orderSlice";
import shopProductSlice from "./shop/productSlice";
import shopCartSlice from "./shop/cartSlice";
import shopAddressSlice from "./shop/addressSlice";
import shopOrderSlice from "./shop/orderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProduct: adminProductSlice,
    adminOrder: adminOrderSlice,
    shopProduct: shopProductSlice,
    shopCart: shopCartSlice,
    shopAddress: shopAddressSlice,
    shopOrder: shopOrderSlice,
  },
});

export default store;
