import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Phare() {

    const params = useParams()
    const productId = params.id;
    const [product, setProduct] = useState([]);

    //  const [prodBdd, setProdBdd] = useState(product.map(prod => prod.id));

    useEffect(() => {
        async function fetchProduct() {
            const response = await fetch('/products/find-top?limit=5');
            console.log('---', response.status)
            if (response.status === 200) {
                const json = await response.json();

                console.log("phare données :", json)
                setProduct(json.data)
            } else {
                //console.log("no product")
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
        marginTop: "50px",
    };
    const div2Style = {

        display: "flex",
    };
    return (
        <div>
            <center style={div1Style}>
                <h2> Nos Produits Phare</h2>
            </center>
            <Slider {...settings} style={div1Style}>
                <div>
                    <img src="https://res.cloudinary.com/dxqhz3pif/image/upload/v1685895698/saucisson_ekobne.jpg" width="250px" alt="" />
                </div>
                <div>
                    <img src="https://res.cloudinary.com/dxqhz3pif/image/upload/v1685895698/cerises_xbs1hh.jpg" width="250px" alt="" />

                </div>
                <div>
                    <img src="https://res.cloudinary.com/dxqhz3pif/image/upload/v1685895698/jus_m4dfp7.jpg" width="250px" alt="" />

                </div>
                <div>
                    <img src="https://res.cloudinary.com/dxqhz3pif/image/upload/v1685895699/cidre_vqty8h.jpg" width="250px" alt="" />

                </div>
                <div>
                    <img src="https://res.cloudinary.com/dxqhz3pif/image/upload/v1685895698/courgette_r16hpj.jpg" width="250px" alt="" />

                </div>
            </Slider>
        </div>
    );
}


export default Phare;