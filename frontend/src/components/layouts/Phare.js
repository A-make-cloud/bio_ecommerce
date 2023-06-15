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



    useEffect(function effectFunction() {
        async function fetchProduct() {
            const response = await fetch('/products/find-top?limit=5');
            //console.log(response.status)
            if (response.status === 200) {
                const json = await response.json();

                //console.log("phare données :", json)
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
                    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.CejsIKxN2WSh9b5Ie4qEzQAAAA%26pid%3DApi&f=1&ipt=6194c53749470c3a17c475c68b6b6bc1ac9ec9062b15a8e6680f170af61d11d8&ipo=images" width="250px" alt="" />
                </div>
                <div>
                    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.k77O_73kq-O9zgi4ROrbwAAAAA%26pid%3DApi&f=1&ipt=a78bcd29b26fa2503bc381da911892930229ad46733139d341508adf64c6e23e&ipo=images" width="250px" alt="" />

                </div>
                <div>
                    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.jMoWIY3XxgtzcGAWor9JCAAAAA%26pid%3DApi&f=1&ipt=90a17694a507a02169b8e3dbf54b2c544ca3225de1592ed9be6e67c054f1161d&ipo=images" width="250px" alt="" />

                </div>
                <div>
                    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.ercuis.com%2Fmedia%2Fcatalog%2Fproduct%2Fcache%2F2%2Fimage%2F400x436%2F9df78eab33525d08d6e5fb8d27136e95%2Ff%2F5%2Ff51p480-23.jpg&f=1&nofb=1&ipt=aa97817f832af178ab9f6e45f380e01a9876fe6ef950d69279b54a7114d277c0&ipo=images" width="250px" alt="" />

                </div>
                <div>
                    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.jardindeco.com%2Fdata%2Fimg%2Fproduits%2Fthumbs%2F442_344_wbg%2FAssiette-d%25C3%25A9cor%25C3%25A9e-fibre-bambou-Wax-blanc.jpg&f=1&nofb=1&ipt=a9c2ca99717064ae1d4c5343e7534b2abc3f25533a304609926f733d84e9f26d&ipo=images" width="250px" alt="" />

                </div>
            </Slider>
        </div>
    );
}


export default Phare;