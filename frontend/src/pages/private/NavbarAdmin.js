
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

export default function NavbarAdmin() {

    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null


    return (<div style={{display:'flex', justifyContent:'space-around', alignContent:'center', backgroundColor:'#C8E6C9'}}>
        <h1>Bio Shop - Espace Admin</h1>
        <h2>Bonjour {user ? user.firstname : ""}   {user ? user.lastname : ""}  </h2>
        <div>
        <Link to="/dashboard" style={{ textDecoration: "none", marginRight: 10 }}>Dashboard</Link>
        <Link to="/dashboard/add-product" style={{ textDecoration: "none", marginRight: 10 }}>Catégories</Link>
        <Link to="/dashboard/add-product" style={{ textDecoration: "none", marginRight: 10 }} >Produits</Link>
        <Link to="/dashboard/add-product" style={{ textDecoration: "none", marginRight: 10 }}>Users</Link>
        <Link to="/dashboard/add-product" style={{ textDecoration: "none", marginRight: 10 }}>Commandes</Link>
        </div>
    </div>)
}
