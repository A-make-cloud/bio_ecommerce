import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


import { styled } from '@mui/material/styles';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



const div1Style = {

    marginTop: "100px",
};


export default function TopCategorie() {
    const theme = useTheme();
    return (
        <div style={div1Style}>
            <center><h2 >Top catégorie</h2></center>
            <Box sx={{ flexGrow: 1, marginTop: 5, marginBottom: 20 }}>
                <Grid container spacing={2}>
                    <Grid xs={4}>
                        <Item>
                            <Card sx={{ display: 'flex' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography component="div" variant="h5">
                                            Categorie
                                        </Typography>

                                    </CardContent>

                                </Box>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 151 }}
                                    image="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
                                    alt="Live from space album cover"
                                />
                            </Card>
                        </Item>
                    </Grid>
                    <Grid xs={4}>
                        <Item>
                            <Card sx={{ display: 'flex' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography component="div" variant="h5">
                                            Categorie
                                        </Typography>

                                    </CardContent>

                                </Box>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 151 }}
                                    image="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
                                    alt="Live from space album cover"
                                />
                            </Card>
                        </Item>
                    </Grid>
                    <Grid xs={4}>
                        <Item>         <Card sx={{ display: 'flex' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5">
                                        Categorie
                                    </Typography>

                                </CardContent>

                            </Box>
                            <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
                                alt="Live from space album cover"
                            />
                        </Card></Item>
                    </Grid>
                    <Grid xs={4}>
                        <Item>         <Card sx={{ display: 'flex' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5">
                                        Categorie
                                    </Typography>

                                </CardContent>

                            </Box>
                            <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
                                alt="Live from space album cover"
                            />
                        </Card></Item>
                    </Grid>
                    <Grid xs={4}>
                        <Item>         <Card sx={{ display: 'flex' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5">
                                        Categorie
                                    </Typography>

                                </CardContent>

                            </Box>
                            <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
                                alt="Live from space album cover"
                            />
                        </Card></Item>
                    </Grid>
                    <Grid xs={4}>
                        <Item>         <Card sx={{ display: 'flex' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5">
                                        Categorie
                                    </Typography>

                                </CardContent>

                            </Box>
                            <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
                                alt="Live from space album cover"
                            />
                        </Card></Item>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}