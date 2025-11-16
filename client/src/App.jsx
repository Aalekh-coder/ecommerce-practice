import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminLayout from "./components/admin-view/AdminLayout";
import Product from "./pages/admin-view/Product";
import Features from "./pages/admin-view/Features";
import Dashboard from "./pages/admin-view/Dashboard";
import Orders from "./pages/admin-view/Orders";
import ShoppingLayout from "./components/shopping-view/ShoppingLayout";
import NotFound from "./pages/NotFound";
import Listing from "./pages/shopping-view/Listing";
import Home from "./pages/shopping-view/Home";
import Account from "./pages/shopping-view/Account";
import Checkout from "./pages/shopping-view/Checkout";
import CheckAuth from "./components/common/CheckAuth";
import Unauth from "./pages/Unauth";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/authSlice";
import { Skeleton } from "./components/ui/skeleton";
import PaypalReturn from "./pages/shopping-view/PaypalReturn";
import PaymentSuccess from "./pages/shopping-view/PaymentSuccess";

const App = () => {

  const { user, isAuthenticated, isLoading } = useSelector(state => state.auth)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  if (isLoading) return <Skeleton className="h-[40vh] w-[80vw] rounded-full" />

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/auth" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AuthLayout /></CheckAuth>}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/admin" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AdminLayout /></CheckAuth>}>
          <Route path="products" element={<Product />} />
          <Route path="features" element={<Features />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
        </Route>

        <Route path="/shop" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><ShoppingLayout /></CheckAuth>}>
          <Route path="listing" element={<Listing />} />
          <Route path="home" element={<Home />} />
          <Route path="account" element={<Account />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="paypal-return" element={<PaypalReturn />} />
          <Route path="payment-success" element={<PaymentSuccess />} />
        </Route>

        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={<Unauth />} />
      </Routes>
    </div>
  );
};

export default App;
