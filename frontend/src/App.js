import React from 'react'
import './App.css';
import { Route, Routes, useParams, Link } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import NavBar from './components/layouts/Navbar';

function App() {

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>

    </div>
  );
}

export default App;
