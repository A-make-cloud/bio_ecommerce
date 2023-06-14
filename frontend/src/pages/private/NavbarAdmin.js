
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

export default function NavbarAdmin() {
    //const { user } = useContext(AuthContext);
    const location = useLocation();
    return (
        <div className="sidebar adminSidebar">
            <h2><label htmlFor="sidebarBtn"><MenuIcon id="burger"/></label>Espace admin</h2>
            <input type="checkbox" id="sidebarBtn"/>
            <ul>
                <li className={location.pathname==='/dashboard' ? "selected": ""}><Link to="/dashboard" ><DashboardOutlinedIcon/>Dashboard</Link></li>
                <li className={location.pathname==='/dashboard/products' ? "selected": ""}><Link to="/dashboard/products" ><ListOutlinedIcon/>Produits</Link></li>
                <li className={location.pathname==='/dashboard/add-product' ? "selected": ""}><Link to="/dashboard/add-product" ><PlaylistAddOutlinedIcon/>Ajouter produit</Link></li>
                <li className={location.pathname==='/dashboard/categories' ? "selected": ""}><Link to="/dashboard/categories" ><CategoryOutlinedIcon/>Catégories</Link></li>
                <li className={location.pathname==='/dashboard/users' ? "selected": ""}><Link to="/dashboard/users" ><PeopleAltOutlinedIcon/>Utilisateurs</Link></li>
                <li className={location.pathname==='/dashboard/orders' ? "selected": ""}><Link to="/dashboard/orders" ><LocalShippingOutlinedIcon/>Commandes</Link></li>
            </ul>
        </div>
    )
}
