import React, { useState, useEffect } from "react";

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
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
};


function TopCategorie() {

    const [categories, setCategories] = useState([]);


    useEffect(() => {

        async function fetchCateg() {
            //recuperer les info de la base de donnée 
            await fetch('/categories/findAll')
                .then(response => response.json())
                .then((res) => {
                    console.log("categorie donnée :");
                    setCategories(res)
                })
        }
        fetchCateg()

    }, []);

    return (
        <div style={div1Style}>
            <center><h2 >Top catégorie</h2></center>


            <CategorieTop categories={categories} />

        </div>
    );
}

export default TopCategorie;