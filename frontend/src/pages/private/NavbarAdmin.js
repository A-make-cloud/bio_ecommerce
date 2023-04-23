
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
export default function NavbarAdmin() {
    const { user } = useContext(AuthContext);

    return (
    <div className="adminSidebar">
        <h2>Espace Admin</h2>
        <h3>Bonjour {user ? user.firstname : ""} {user ? user.lastname : ""}</h3>
        <ul>
            <li><Link to="/dashboard" ><DashboardOutlinedIcon/>Dashboard</Link></li>
            <li><Link to="/dashboard/add-product" ><CategoryOutlinedIcon/>Catégories</Link></li>
            <li><Link to="/dashboard/add-product" ><ListOutlinedIcon/>produits</Link></li>
            <li><Link to="/dashboard/add-product" ><PlaylistAddOutlinedIcon/>Ajouter produit</Link></li>
            <li><Link to="/dashboard/add-product" ><PeopleAltOutlinedIcon/>Utilisateurs</Link></li>
            <li><Link to="/dashboard/add-product" ><LocalShippingOutlinedIcon/>Commandes</Link></li>
        </ul>
    </div>)
}
