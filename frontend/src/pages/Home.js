import NavBar from '../components/layouts/Navbar.js'
import { Link } from "react-router-dom";
import Footer from '../components/layouts/Footer.js'
import Concept from '../components/layouts/Concept.js';
import Phare from '../components/layouts/Phare.js';
import TopCategorie from '../components/layouts/TopCategorie.js';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Alert } from '@mui/material'

// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import { CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import Container from '@mui/material/Container';
// or
//import { Container } from '@mui/material';
import imageHead from '../static/head.jpg';

//import image from '../static/head.jpg';

const Item = styled(Paper)(({ theme }) => ({
    backgroundImage: theme.shape === 'contain' ? '#1A2027' : '#fff',
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,

}));
function Home() {
    const [color, setColor] = useState('info')
    const [message, setMessage] = useState('Chargement en cours...')

    return (
        <div>

            <div className='monHeader' style={{
                width: '61px', height: '61px', backgroundImage: `url(${imageHead})`,
                backgroundRepeat: 'no-repeat', backgroundPosition: 'center', width: '100%', height: '330px',
                backgroundSize: 'cover', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
                    <h1 style={{ fontFamily: "" }}>Des produits bio de qualité livrés chez vous</h1>
                    <Link to='/products' style={{ textDecoration: "none" }}><Button variant="contained" style={{ backgroundColor: "#FFB300", color: 'black' }}>Découvrez</Button></Link>
                    {/*<h3><Link to='/products'>Découvrez tout nos produits ici</Link></h3>*/}

                </div>
            </div>

            <Container>
                {message ? <Alert severity={color}>{message}</Alert> : ""}
                <Concept />
                { <Phare /> }
                <TopCategorie setColor={setColor} setMessage={setMessage}/>
            </Container>

        </div>
    );
}

export default Home;