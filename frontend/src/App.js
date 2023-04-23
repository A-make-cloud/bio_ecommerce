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
//import NavbarAdmin from './pages/private/NavbarAdmin';
//--------------------Espace client
import HomeClient from './pages/client/HomeClient';
import Profil from './pages/client/Profil';
import Commande from './pages/client/Commande';


function App() {

  const { isLogged, profil, user } = useContext(AuthContext);
  const location = useLocation();

  return (
    <div className="App">
      <NavBar />
      {/*isLogged && profil === "admin" && location.pathname.includes('dashboard') ?
        <NavbarAdmin />
  : ""*/}
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
            {/*ajouter page users, commandes, categories, */}

          </>
          : ""}

        {isLogged && ( profil === "client" || profil === "admin" ) ?
          <>
            <Route path="/client" element={<HomeClient />} />
            <Route path="/client/profil" element={<Profil />} />
            <Route path="/client/commandes" element={<Commande />} />
            {/*ajouter page adresses*/}
          </> : ""}
          <Route path='*' element={<div style={{margin:'16px'}}><h1>Erreur 404</h1><p>Page inexistente ou inaccessible.</p></div>} />
      </Routes>

      {/* {isLogged && profil === "admin" && !location.pathname.includes('dashboard') ?'': } */}
        <Footer />

    </div>
  );
}

export default App;
