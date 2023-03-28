//import css from './css.css';
//import addButton from '../Product';
import { Box, Card, CardContent, CardMedia, Tooltip, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import Footer from "../components/layouts/Footer";
import NavBar from "../components/layouts/Navbar";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { BasketContext } from '../../src/contexts/BasketContext';

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
      <NavBar />

      {/* <main>
        <h4>{product ? product.name : ''}</h4>
        <p>{product ? product.description.slice(0, 40) + "..." : ''}</p>
        <p>{product ? product.price_ht : ''}</p>
      </main> */}


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

                      <div style={{}} className="addButton">
                        {/* {basket.total} */}
                        <Tooltip title="Ajouter au panier" placement="right-end">
                          {/* <ControlPointIcon onClick={(e) => addOne(productId)} /> */}
                        </Tooltip>
                      </div>
                    </Typography>

                  </CardContent>

                </Box>

              </Card>
            </Item>
          </Grid>
          {/* <Grid xs={2}>
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
                  // image="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
                  alt="Live from space album cover"
                />
              </Card>
            </Item>
          </Grid> */}
        </Grid>
      </Box>
      <div>
        <h4>Nom :{product ? product.name : ''}</h4>
        <p>Description :{product ? product.description.slice(0, 40) + "..." : ''}</p>
      </div>
      <Footer />

    </div >
  );
}
export default Product;