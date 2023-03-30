import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

function Phare() {

    const params = useParams()
    const productId = params.id;
    const [product, setProduct] = useState([]);

    const [limit, setLimit] = useState(5);



    //  const [prodBdd, setProdBdd] = useState(product.map(prod => prod.id));



    useEffect(function effectFunction() {
        async function fetchProduct() {
            const response = await fetch('/products/findAll');
            console.log(response.status)

            if (response.status === 201) {
                const json = await response.json();

                // json.data[0].getImages().then((images) => {
                //     console.log(images);
                // });

                console.log(json)
                setProduct(json.data)
            } else {
                console.log("no product")
            }
        }
        fetchProduct();
    }, []);

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
    const div2Style = {

        display: "flex",
    };
    return (
        <div style={div1Style}>
            <center><h2>Nos produits phare</h2></center>
            <div style={div1Style}>
                <Slider {...settings} style={div2Style}>
                    <>


                        {/* product.slice(0, limit ? limit : product.length).map(item =>) */}

                        {product && product.map((prod, index) => (
                            <Card key={prod.id} sx={{ maxWidth: 345 }} cols={2}>
                                <CardActionArea>
                                    <CardMedia sx={{ maxWidth: 80 }}
                                        component="img"
                                        height="80"
                                        image={prod.images ? prod.images[0].url : 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'}
                                        alt={prod.images ? prod.images[0].title : 'fake image'}

                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div">
                                            <h5 >
                                                <p>Nom :{prod.title}</p>
                                                <br /> Prix :{prod.price_ht}
                                                <br /> Prix :{prod.description.substring(1, 20)}</h5>
                                        </Typography>

                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        ))}

                    </>
                    <div>
                        {/* <Card sx={{ maxWidth: 345 }} cols={2}>
                            {product && product.map((prod, index) => (
                                <CardActionArea key={prod.id}>
                                    <CardMedia sx={{ maxWidth: 80 }}
                                        component="img"
                                        height="80"
                                        image={prod.images ? prod.images[0].url : ''}
                                        alt={prod.images ? prod.images[0].title : 'fake image'}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div">
                                            <h5 >
                                                <p>Nom :{prod.title}</p>
                                                <br /> Prix :{prod.price_ht}
                                                <br /> Prix :{prod.description.substring(1, 20)}</h5>
                                        </Typography>

                                    </CardContent>
                                </CardActionArea>
                            ))}
                        </Card> */}

                    </div>
                    <div>


                    </div>
                    <div>


                    </div>

                </Slider>
            </div>
        </div>
    );
}


export default Phare;
