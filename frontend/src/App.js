import React, { useContext, useState } from 'react'
import './App.css';
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Basket from "./pages/Basket";

import Login from "./pages/Login";
import Product from "./pages/Product";

import NavBar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Register from './pages/Register';

import { AuthContext } from './contexts/AuthContext';
//--------------------Espace admin
import Addproduct from './pages/private/Addproduct';
import Dashboard from './pages/private/Dashboard';

//--------------------Espace client

import HomeClient from './pages/client/HomeClient';
import Profil from './pages/client/Profil';
import Commande from './pages/client/Commande';
import NavbarAdmin from './pages/private/NavbarAdmin';

function App() {
  // const [isLogged, setIsLogged] = useState(false)

  const { isLogged, profil } = useContext(AuthContext);
  console.log("isLogged", isLogged)
  console.log("prfil", profil)
  //profil admin||client 
  //isLogged true||false
  const location = useLocation();

  return (
    <div className="App">
      <NavBar />
      {isLogged && profil === "admin" && location.pathname.includes('dashboard') ?
        <NavbarAdmin />
        : ""}
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<Product />} />

        {isLogged && profil === "admin" ?
          <>

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/add-product" element={<Addproduct />} />
          </>
          : ""}

        {isLogged && profil === "client" ?
          <>
            <Route path="/client" element={<HomeClient />} />
            <Route path="/client/profil" element={<Profil />} />
            <Route path="/client/commandes" element={<Commande />} />

          </> : ""}



      </Routes>

      {isLogged && profil === "admin" && !location.pathname.includes('dashboard') ?
        <Footer />
        : ''}


    </div>
  );
}

export default App;
