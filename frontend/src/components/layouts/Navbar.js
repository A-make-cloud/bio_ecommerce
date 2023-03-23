// import { Link } from "react-router-dom";

// function NavBar() {
//     return (
//         <nav>
//             <Link to="/">Accueil</Link>
//             <Link to="/products">Nos Produits</Link>
//         </nav>
//     );
// }

// export default NavBar;
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from "react-router-dom";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function NavBar() {
    return (

        <Box sx={{ flexGrow: 1 }} >
            <AppBar position="static" style={{ background: '#346344' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >

                        <Link to="/" style={{ color: "inherit", textDecoration: "none", marginRight: 5 }} >Accueil</Link>
                        <Link to="/products" style={{ color: "inherit", textDecoration: "none" }} >Nos Produits</Link>
                    </Typography>
                    <ShoppingBasketIcon />
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}