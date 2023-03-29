
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
export default function NavbarClient() {

    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    return (<>
        <h1>Espace client</h1>
        <h2>Bonjour {user ? user.firstname : ""}   {user ? user.lastname : ""}  </h2>
        <Link to="/client/profil" style={{ textDecoration: "none", marginRight: 10 }}>Mon profil</Link>
        <Link to="/client/commandes" style={{ textDecoration: "none", marginRight: 10 }}>Mes commandes</Link>

    </>)
}
