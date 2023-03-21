import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav>
            <Link to="/">Accueil</Link>
            <Link to="/products">Nos Produits</Link>
        </nav>
    );
}

export default NavBar;
