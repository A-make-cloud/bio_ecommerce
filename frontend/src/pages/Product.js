
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";


import { styled } from '@mui/material/styles';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';


function Product() {
    const [product, setProduct] = useState();
    const params = useParams()
    const productId = params.id;

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
            const response = await fetch('/products/find/' + `${productId}`);
            console.log(response.status)

            if (response.status === 201) {
                const json = await response.json();
                //affichage de l'image
                json.data[0].getImages().then((images) => {
                    console.log(images);
                });
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
                                    // image={Image}
                                    image={product.images ? product.images[0].url : ''}
                                    alt={product.images ? product.images[0].title : 'pas d image'}
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flex: '1 0 auto' }} xs={4}>
                                        <Typography container component="div" variant="h5">
                                            <main>
                                                <h4>Ajout Panier</h4>
                                                <p>Nom :{product ? product.title : ''}</p>

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


                <p>Nom :{product ? product.title : ''}</p>
                <p>Description :{product ? product.description.slice(0, 40) + "..." : ''}</p>



            </div >
        </div>
    );
}
export default Product;