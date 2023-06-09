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
        <section style={{
            boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
            margin: '29px', paddingTop: '9px', borderRadius: '20px', paddingBottom: '10px'
        }}>
            <center><h2>3 bonnes raisons de commander nos paniers</h2></center>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} columns={12}>
                    <Grid item xs={4}>
                        <Item sx={{ boxShadow: 'none' }}>
                            <center>
                                <Card sx={{ maxWidth: 345, boxShadow: 'none' }} cols={2}>
                                    <CardActionArea>
                                        <CardMedia sx={{ maxWidth: 100 }}
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
                        <Item sx={{ boxShadow: 'none' }}>
                            <center>
                                <Card sx={{ maxWidth: 345, boxShadow: 'none' }}>
                                    <CardActionArea>
                                        <CardMedia sx={{ maxWidth: 100 }}
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
                        <Item sx={{ boxShadow: 'none' }}>
                            <center>
                                <Card sx={{ maxWidth: 345, boxShadow: 'none' }}>
                                    <CardActionArea>
                                        <CardMedia sx={{ maxWidth: 100 }}
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