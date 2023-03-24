/*
import React from 'react';
import Carousel from 'react-material-ui-carousel'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import image1 from '../../static/concept_1.png'
import image2 from '../../static/concept_2.png'
import image3 from '../../static/concept_3.png'


function Phare(props) {
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            image: { image1 }
        },
        {
            name: "Random Name #2",
            description: "Hello World!",
            image: { image2 }

        },
        {
            name: "Random Name #3",
            description: "Hello trois!",
            image: { image3 }

        },
    ]

    return (
        <section>
            <h1>Nos produits phare</h1>
            <ArrowForwardIosIcon />

            <Carousel>
                {
                    items.map((item, i) => <item key={i} item={item} />)
                }


            </Carousel>
            <ArrowBackIosNewIcon />

        </section>
    )
}

export default Phare;
*/
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { Component } from "react";
import Slider from "react-slick";

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
        return (
            <div>
                <h2>Auto Play</h2>
                <Slider {...settings}>
                    <div>
                        <h3>1</h3>
                    </div>
                    <div>
                        <h3>2</h3>
                    </div>
                    <div>
                        <h3>3</h3>
                    </div>
                    <div>
                        <h3>4</h3>
                    </div>
                    <div>
                        <h3>5</h3>
                    </div>
                    <div>
                        <h3>6</h3>
                    </div>
                </Slider>
            </div>
        );
    }
}