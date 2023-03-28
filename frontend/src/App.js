import React, { useState } from 'react'
import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Basket from "./pages/Basket";

import Login from "./pages/Login";
import Product from "./pages/Product";
import Dashboard from './pages/private/Dashboard';
import NavBar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Register from './pages/Register';
import Addproduct from './pages/private/Addproduct';
function App() {
  const [isLogged, setIsLogged] = useState(false)



  return (
    <div className="App">
      <NavBar isLogged={isLogged} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/register" element={<Register setIsLogged={setIsLogged} isLogged={isLogged} />} />
        <Route path="/login" element={<Login setIsLogged={setIsLogged} isLogged={isLogged} />} />
        <Route path="/product/:id" element={<Product />} />

        {
          /*isLogged*/true && 
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/addproduct" element={<Addproduct />} />
            </>
        }


      </Routes>
      <Footer />
    </div>
  );
}

export default App;
