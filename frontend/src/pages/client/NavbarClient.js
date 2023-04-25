
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
export default function NavbarClient() {

    //const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null /!\ No localStorage for user details
    const { user } = useContext(AuthContext);

    return (
        <div className="sidebar clientSidebar">
            <h2><label htmlFor="sidebarBtn"><MenuIcon id="burger"/></label>Espace client</h2>
            <input type="checkbox" id="sidebarBtn"/>
            <ul>
                {/* {<h2>Bonjour {user ? user.firstname : ""}   {user ? user.lastname : ""}  </h2>} */}
                <li><Link to="/client"><PersonOutlineOutlinedIcon/>Tableau de bord</Link></li>
                <li><Link to="/client/profil"><ManageAccountsOutlinedIcon/>Mes détails</Link></li>
                <li><Link to="/client/commandes"><LocalShippingOutlinedIcon/>Mes commandes</Link></li>
                <li><Link to="/client/commandes"><HomeOutlinedIcon/>Mes adresses</Link></li>
            </ul>
        </div>
    )


    // return (<>
    //     <h1>Espace client</h1>
    //     <h2>Bonjour {user ? user.firstname : ""}   {user ? user.lastname : ""}  </h2>
    //     <Link to="/client/profil" style={{ textDecoration: "none", marginRight: 10 }}>Mon profil</Link>
    //     <Link to="/client/commandes" style={{ textDecoration: "none", marginRight: 10 }}>Mes commandes</Link>

    // </>)

}
