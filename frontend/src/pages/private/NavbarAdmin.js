
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
export default function NavbarAdmin() {
    const { user } = useContext(AuthContext);

    return (
        <div className="sidebar adminSidebar">
            <h2><label htmlFor="sidebarBtn"><MenuIcon id="burger"/></label>Espace admin</h2>
            <input type="checkbox" id="sidebarBtn"/>
            <ul>
                <li><Link to="/dashboard" ><DashboardOutlinedIcon/>Dashboard</Link></li>
                <li><Link to="/dashboard/products" ><ListOutlinedIcon/>Produits</Link></li>
                <li><Link to="/dashboard/add-product" ><PlaylistAddOutlinedIcon/>Ajouter produit</Link></li>
                <li><Link to="/dashboard/add-product" ><CategoryOutlinedIcon/>Catégories</Link></li>
                <li><Link to="/dashboard/add-product" ><PeopleAltOutlinedIcon/>Utilisateurs</Link></li>
                <li><Link to="/dashboard/add-product" ><LocalShippingOutlinedIcon/>Commandes</Link></li>
            </ul>
        </div>
    )
}
