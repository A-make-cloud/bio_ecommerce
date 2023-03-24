import NavBar from '../components/layouts/Navbar.js'

import Footer from '../components/layouts/Footer.js'
import Concept from '../components/layouts/Concept.js';
import Phare from '../components/layouts/Phare.js';
import TopCategorie from '../components/layouts/TopCategorie.js';

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
    return (
        <div>
            <NavBar />

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} columns={16}>
                    <Grid item xs={12}>
                        <Item>
                            <div sx={{ maxWidth: 1800 }} cols={2}>
                                <div>

                                    <CardMedia
                                        component="img"
                                        height="400"
                                        image={imageHead}
                                        alt="image head"
                                    />
                                    {/* <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Lizard
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Lizards are a widespread group of squamate reptiles, with over 6,000
                                            species, ranging across all continents except Antarctica
                                        </Typography>
                                    </CardContent> */}
                                </div>
                            </div>
                        </Item>
                    </Grid>


                </Grid>
            </Box>
            <Container>
                <Concept />
                <Phare />
                <TopCategorie />
            </Container>
            <Footer />
        </div >
    );
}

export default Home;