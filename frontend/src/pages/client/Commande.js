import NavbarClient from './NavbarClient';

export default function Commande() {
    return (
        <div className="clientBody">
            <NavbarClient />
            <div className="clientContent">
                <h1>Mes commandes </h1>
                <p>Vous n'avez pas de commande en cours</p>
            </div>
        </div>)
}
