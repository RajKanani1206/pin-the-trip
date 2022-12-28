import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Map from "./pages/Map";
import { ToastContainer } from "react-toastify";
import { UserContextProvider } from "./context/UserContextProvider";

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/map" element={<Map />} />
      </Routes>
      <ToastContainer />
    </UserContextProvider>
  );
};

export default App;
