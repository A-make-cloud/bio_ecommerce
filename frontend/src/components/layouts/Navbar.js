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
import { BasketContext } from '../../contexts/BasketContext'
import Button from '@mui/material/Button';
import { CardMedia, Tooltip } from '@mui/material';
import { Container } from '@mui/system';
import logo from '../../static/logoBioShop.png'




export default function NavBar() {

    const { basket, addOne } = React.useContext(BasketContext);
    return (
        <div>
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

                                <Link to="/" style={{ color: "inherit", textDecoration: "none", marginRight: 5 }} >Accueil</Link>
                                <Link to="/products" style={{ color: "inherit", textDecoration: "none" }} >Nos Produits</Link>
                            </Typography>
                            <ShoppingBasketIcon />
                            <Button color="inherit">Login</Button>
                        </Toolbar>
                    </Container>
                </AppBar>
            </Box>
        </div>

    );
}