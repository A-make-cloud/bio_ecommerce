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
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import { Container } from '@mui/system';
import Paper from '@mui/material/Paper';

import Tooltip from '@mui/material/Tooltip';
//import Logo from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import logo from '../../static/logoBioShop.png'
import CardMedia from '@mui/material/CardMedia';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#346344',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,


}));
export default function NavBar() {

    return (

        <Box sx={{ flexGrow: 1 }} >
            <AppBar position="static" style={{ background: '#346344' }}>
                <Container>
                    <Toolbar>
                        <Tooltip title="Open settings">
                            <IconButton sx={{ p: 0 }}>
                                <Item>
                                    <CardMedia

                                        component="img"
                                        height="80"
                                        image={logo}
                                        alt="logo"
                                    />
                                </Item>
                            </IconButton>
                        </Tooltip>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >

                        </IconButton>

                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >

                            <Link to="/" style={{ color: "inherit", textDecoration: "none", marginRight: 10 }} >Accueil</Link>
                            <Link to="/products" style={{ color: "inherit", textDecoration: "none", marginRight: 10 }} >Nos Produits</Link>
                            <Link to="/valeurs" style={{ color: "inherit", textDecoration: "none", marginRight: 10 }} >Nos Valeurs</Link>
                            <Link to="/contact" style={{ color: "inherit", textDecoration: "none" }} >Nous Contacter</Link>
                        </Typography>
                        <ShoppingBasketIcon style={{ marginRight: 10 }} />
                        <PersonIcon />

                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}