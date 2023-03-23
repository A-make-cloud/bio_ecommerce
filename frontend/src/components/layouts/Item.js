import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import image1 from '../../static/concept_1.png'
import image2 from '../../static/concept_2.png'
import image3 from '../../static/concept_3.png'
function Item(props) {
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
            <ArrowForwardIosIcon />


            <ArrowBackIosNewIcon />

        </section>
    )
}

export default Item;