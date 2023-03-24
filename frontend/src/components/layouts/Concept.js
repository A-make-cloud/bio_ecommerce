import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import image1 from '../../static/concept_1.png'
import image2 from '../../static/concept_2.png'
import image3 from '../../static/concept_3.png'

const footerEltMarginTop = 50;
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    paddingTop: `${footerEltMarginTop}px`,


}));

export default function Concept() {
    return (
        <section>
            <center><h2>3 bonnes raisons de commander nos paniers</h2></center>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} columns={16}>
                    <Grid item xs={4}>
                        <Item>
                            <center>
                                <Card sx={{ maxWidth: 345 }} cols={2}>
                                    <CardActionArea>
                                        <CardMedia sx={{ maxWidth: 80 }}
                                            component="img"
                                            height="80"
                                            image={image1}
                                            alt="img"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h6" component="div">
                                                <h5 >Une alimentation bio <br /> ultra-locale</h5>
                                            </Typography>

                                        </CardContent>
                                    </CardActionArea>
                                </Card>

                            </center>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            <center>
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardActionArea>
                                        <CardMedia sx={{ maxWidth: 80 }}
                                            component="img"
                                            height="80"
                                            image={image2}
                                            alt="img"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h6" component="div">
                                                <h5> Simple et <br /> sans abonnement</h5>
                                            </Typography>

                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </center>

                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            <center>
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardActionArea>
                                        <CardMedia sx={{ maxWidth: 80 }}
                                            component="img"
                                            height="80"
                                            image={image3}
                                            alt="img"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h6" component="div">
                                                <h5>Direct du producteur <br /> au consommateur</h5>
                                            </Typography>

                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </center>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </section>
    );
}