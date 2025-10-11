import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

const App = () => {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* common header  */}

      <h1>Header Components</h1>

      <Routes>
        <Route path="/auth" element={<AuthLayout/>}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
