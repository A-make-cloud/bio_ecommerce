import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link, useNavigate } from "react-router-dom";
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
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useContext, useState } from 'react';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { AuthContext } from '../../contexts/AuthContext';





export default function NavBar() {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    const navigate = useNavigate();
    const { isLogged, updateIslogged, logoutUser, profil } = useContext(AuthContext);

    const { basket } = React.useContext(BasketContext);
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#346344',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,


    }));
    const logout = () => {
        //deconnect user delete localstorage
        logoutUser()
        //redirection home page
        navigate('/')
    }

    return (
        <div>
            <Box sx={{ flexGrow: 1 }} >
                <AppBar position="static" style={{ background: '#346344' }}>
                    <Container>
                        <Toolbar>
                            {/*<Tooltip title="Open settings">*/}
                            <Link to="/" style={{ color: "inherit", textDecoration: "none", marginRight: 5 }} >
                                    <Item sx={{boxShadow:'none'}}>
                                        <CardMedia
                                            component="img"
                                            height="80"
                                            image={logo}
                                            alt="logo"
                                        />
                                    </Item>
                                </Link>
                            {/*</Tooltip>*/}
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

                            {isLogged &&
                                <p style={{marginRight:'21px'}}>Bonjour {user ? user.firstname : ""} {user ? user.lastname : ""} </p>}

                            {isLogged && profil=== 'admin'? 
                            <Link to="/dashboard" style={{ color: "inherit", textDecoration: "none" }}>
                                <AdminPanelSettingsIcon/>
                            </Link>
                            : ''}



                            {!isLogged ?
                                <Link to="/register" style={{ color: "inherit", textDecoration: "none" }}>

                                    <Button color="inherit">S'inscrire</Button>
                                </Link> : ""}
                            {!isLogged ?
                                <Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>
                                    <Button color="inherit">Login</Button>
                                </Link>

                                :
                                <Link onClick={logout} style={{ color: "inherit", textDecoration: "none" }}>

                                    <Button color="inherit">Logout</Button>
                                </Link>
                            }
                            <Link to="/basket" style={{ color: "inherit", textDecoration: "none" }}>{/*todo: il faudra faire de l'icone du panier un composant à part entiere*/}
                                <ShoppingBasketIcon />
                                {basket.items.length > 0 && <span style={{ fontSize: 'small' }}>{basket.items.length}</span>}
                            </Link>

                        </Toolbar>
                    </Container>
                </AppBar>
            </Box>
        </div>

    );
}