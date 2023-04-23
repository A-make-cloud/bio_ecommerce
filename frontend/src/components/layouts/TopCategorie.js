import React, { useState, useEffect } from "react";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { useParams } from "react-router-dom";
import Categories from "../products/Categories";
import CategorieTop from "./CategorieTop";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



const div1Style = {

    marginTop: "100px",
    marginBottom: "30px",
};


function TopCategorie() {
    const theme = useTheme();

    const params = useParams()
    const categId = params.id;
    const [categories, setCategories] = useState([]);

    // useEffect(function effectFunction() {
    //     async function fetchCateg() {
    //         const response = await fetch('/categories/findAll');
    //         console.log(response.status)

    //         if (response.status === 201) {
    //             const json = await response.json();

    //             console.log(json)
    //             setCategories(json.data)
    //         } else {
    //             console.log("no categ")
    //         }
    //     }
    //     fetchCateg();
    // }, []);

    useEffect(() => {

        async function fetchCateg() {
            //recuperer les info de la base de donnée 
            await fetch('/categories/findAll')
                .then(response => response.json())
                .then((res) => {
                    setCategories(res.data)
                })
        }
        fetchCateg()

    }, []);

    return (
        <div style={div1Style}>
            <center><h2 >Top catégorie</h2></center>
            {/* <Box sx={{ flexGrow: 1, marginTop: 5, marginBottom: 20 }}>
                <Grid container spacing={2}>

                    <Grid xs={4}>

                        <Item>
                            {categories && categories.map((cat, index) => (
                                <Card sx={{ display: 'flex' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', background: `${cat.background}` }}>
                                        <CardContent sx={{ flex: '1 0 auto' }}>
                                            <Typography component="div" variant="h5">
                                                <p>{cat.title}</p>
                                                <h5 >
                                                    <br /> {cat.description.substring(1, 20)}</h5>
                                            </Typography>

                                        </CardContent>

                                    </Box>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 151 }}
                                        image={cat.img ? cat.img.url : 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'}
                                        alt={cat.img ? cat.img[0].title : 'pas d image'}


                                    />
                                </Card>
                            ))}
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
            </Box> */}

            <CategorieTop categories={categories} />

        </div>
    );
}

export default TopCategorie;