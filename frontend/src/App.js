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
import AdminProducts from './pages/private/Products';
import UpdateProducts from './pages/private/UpdateProducts'
import Users from './pages/private/Users'
import Categories from './pages/private/Categories'
import CategoriesChange from './pages/private/CategoriesChange'
import AdminOders from './pages/private/AdminOders'
import AdminOrder from './pages/private/AdminOrder'
//--------------------Espace client
import HomeClient from './pages/client/HomeClient';
import Profil from './pages/client/Profil';
import Commande from './pages/client/Commande';
import CommandeDetails from './pages/client/CommandeDetails';
import Addresses from './pages/client/Addresses';

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
            <Route path="/dashboard/products" element={<AdminProducts />} />
            <Route path="/dashboard/product/update/:id" element={<UpdateProducts />} />
            <Route path="/dashboard/users" element={<Users />} />
            <Route path="/dashboard/categories" element={<Categories />} />
            <Route path="/dashboard/categories/update/:id" element={<CategoriesChange method='put'/>} />
            <Route path="/dashboard/categories/add" element={<CategoriesChange method='post'/>} />
            <Route path="/dashboard/orders" element={<AdminOders />} />
            <Route path="/dashboard/order/:id" element={<AdminOrder />} />
            {/*ajouter page users, commandes, categories, */}

          </>
          : ""}

        {isLogged && ( profil === "client" || profil === "admin" ) ?
          <>
            <Route path="/client" element={<HomeClient />} />
            <Route path="/client/profil" element={<Profil />} />
            <Route path="/client/commandes" element={<Commande />} />
            <Route path="/client/commande-details/:id" element={<CommandeDetails />} />
            <Route path="/client/addresses" element={<Addresses />} />
            
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
