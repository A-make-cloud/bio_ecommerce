import React from 'react'
import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Basket from "./pages/Basket";

import Login from "./pages/Login";
import Product from "./pages/Product";

function App() {


  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/basket" element={<Basket />} />

        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>

    </div>
  );
}

export default App;
