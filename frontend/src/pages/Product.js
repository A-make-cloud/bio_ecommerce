//import css from './css.css';
//import addButton from '../Product';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";


import { styled } from '@mui/material/styles';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';


function Product() {

    const params = useParams()
    const productId = params.id;
    const [product, setProduct] = useState();
    // const product = { name: 'toto', description: 'titi', price_ht: 'tutu' } //fetcher le produit avec un await...
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));


    useEffect(function effectFunction() {
        async function fetchProduct() {
            const response = await fetch('/products/find/1' + { productId });
            console.log(response.status)
            //if status 201 ==>OK 
            if (response.status === 201) {
                const json = await response.json();
                console.log(json)
                setProduct(json.data)
            } else {
                console.log("no product")
            }

        }
        fetchProduct();
    }, []);


    return (
        <div>
            <Box sx={{ flexGrow: 1, marginTop: 5, marginBottom: 20 }}>
                <Grid container spacing={2}>
                    <Grid xs={10}>
                        <Item>
                            <Card sx={{ display: 'flex' }}>
                                <CardMedia
                                    xs={8}
                                    component="img"
                                    sx={{ width: 900 }}
                                    image="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
                                    alt="Live from space album cover"
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flex: '1 0 auto' }} xs={4}>
                                        <Typography container component="div" variant="h5">
                                            <main>
                                                <h4>Ajout Panier</h4>
                                                <p>Nom :{product ? product.name : ''}</p>
                                                {/* 
                        <p>{product ? product.description.slice(0, 40) + "..." : ''}</p> */}
                                                <p>Prix:{product ? product.price_ht : ''} €</p>
                                            </main>
                                        </Typography>

                                    </CardContent>

                                </Box>

                            </Card>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
            <div>


                <h4>Nom :{product ? product.name : ''}</h4>
                <p>Description :{product ? product.description.slice(0, 40) + "..." : ''}</p>



            </div >
        </div>
    );
}
export default Product;