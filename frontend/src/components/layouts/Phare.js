import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { Component } from "react";
import Slider from "react-slick";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

export default class Phare extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            speed: 2000,
            autoplaySpeed: 2000,
            cssEase: "linear"
        };

        const div1Style = {

            marginTop: "100px",
        };


        return (
            <div style={div1Style}>
                <center><h2>Nos produits phare</h2></center>
                <div style={div1Style}>
                    <Slider {...settings}>
                        <div>
                            <Card sx={{ maxWidth: 345 }} cols={2}>
                                <CardActionArea>
                                    <CardMedia sx={{ maxWidth: 80 }}
                                        component="img"
                                        height="80"
                                        image='https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'
                                        alt="img"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div">
                                            <h5 >Nom produit <br /> Prix </h5>
                                        </Typography>

                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                        <div>
                            <Card sx={{ maxWidth: 345 }} cols={2}>
                                <CardActionArea>
                                    <CardMedia sx={{ maxWidth: 80 }}
                                        component="img"
                                        height="80"
                                        image='https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'
                                        alt="img"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div">
                                            <h5 >Nom produit <br /> Prix </h5>
                                        </Typography>

                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                        <div>
                            <Card sx={{ maxWidth: 345 }} cols={2}>
                                <CardActionArea>
                                    <CardMedia sx={{ maxWidth: 80 }}
                                        component="img"
                                        height="80"
                                        image='https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'
                                        alt="img"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div">
                                            <h5 >Nom Produit <br /> Prix </h5>
                                        </Typography>

                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                        <div>
                            <Card sx={{ maxWidth: 345 }} cols={2}>
                                <CardActionArea>
                                    <CardMedia sx={{ maxWidth: 80 }}
                                        component="img"
                                        height="80"
                                        image='https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'
                                        alt="img"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div">
                                            <h5 >Nom Produit <br /> Prix </h5>
                                        </Typography>

                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                        <div>
                            <Card sx={{ maxWidth: 345 }} cols={2}>
                                <CardActionArea>
                                    <CardMedia sx={{ maxWidth: 80 }}
                                        component="img"
                                        height="80"
                                        image='https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'
                                        alt="img"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div">
                                            <h5 >Nom Produit <br /> Prix </h5>
                                        </Typography>

                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                        <div>
                            <Card sx={{ maxWidth: 345 }} cols={2}>
                                <CardActionArea>
                                    <CardMedia sx={{ maxWidth: 80 }}
                                        component="img"
                                        height="80"
                                        image='https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'
                                        alt="img"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div">
                                            <h5 >Nom produit <br /> Prix </h5>
                                        </Typography>

                                    </CardContent>
                                </CardActionArea>
                            </Card>

                        </div>

                    </Slider>
                </div>
            </div>
        );
    }
}