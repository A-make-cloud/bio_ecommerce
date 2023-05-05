
import NavbarClient from './NavbarClient';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext'
import { Link } from "react-router-dom";
export default function HomeClient() {
    const {user} = useContext(AuthContext);
    return (
        <div className="clientBody">
            <NavbarClient />
            <div className="clientContent">
                <h1>Espace client </h1>
                <p>Bonjour <b>{user.firstname}</b></p>
                <p>Dans votre espace client, vous pouvez visualiser vos <Link to="/client/commandes">commandes</Link>, gérer vos <Link to="/client/addresses">adresses de livraison et de facturation</Link>, et modifier les détails de votre <Link to="/client/profil">compte</Link>.</p>
            </div>
        </div>)
}


