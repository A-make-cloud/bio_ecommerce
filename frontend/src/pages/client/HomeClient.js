
import NavbarClient from './NavbarClient';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext'
export default function HomeClient() {
    const {user} = useContext(AuthContext);
    return (
        <div className="clientBody">
            <NavbarClient />
            <div className="clientContent">
                <h1>Espace client </h1>
                <p>Bonjour <b>{user.firstname}</b></p>
                <p>Vous n'avez pas encore effectué d'achats.</p>
            </div>
        </div>)
}


