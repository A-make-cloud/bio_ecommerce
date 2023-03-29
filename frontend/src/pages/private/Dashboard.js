
import NavbarAdmin from './NavbarAdmin';

import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

function Dashboard() {
    const [products, setProducts] = useState([]);
    let rows = products
    useEffect(() => {

        //RECUPERATION des produits dans BDD
        async function fetchCat() {
            const response = await fetch(`/products/findAll?offset=0&limit=1000`)
            if (response.status !== 500) {
                const json = await response.json()
                rows = json.data
                console.log(json.data)
                setProducts(json.data)
            } else {
                console.log('probleme récupération des produits')
            }
        }
        fetchCat()

    }, []);

    // useEffect(() => {
    //     rows = products
    // }, [products]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'category_id', headerName: 'Catégory', width: 130 },
        { field: 'title', headerName: 'Titre produit', width: 130 },
        // {
        //   field: 'age',
        //   headerName: 'Age',
        //   type: 'number',
        //   width: 90,
        // },
        { field: 'description', headerName: 'Description', width: 180 },
        { field: 'price_ht', headerName: 'Prix HT', width: 130 },
        { field: 'tva', headerName: 'TVA', width: 130 },
        { field: 'quantity', headerName: 'Quantité', width: 130 },
        { field: 'status', headerName: 'Status', width: 130 },
        { field: 'top', headerName: 'Top', width: 130 },
        { field: 'createdAt', headerName: 'Créé le', width: 130 },
        { field: 'updatedAt', headerName: 'mis à jour le', width: 130 },
        // {
        //   field: 'fullName',
        //   headerName: 'Full name',
        //   description: 'This column has a value getter and is not sortable.',
        //   sortable: false,
        //   width: 160,
        //   valueGetter: (params) =>
        //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        // },
    ];



    return (
        <main className="">
            <h1> Dashbord</h1>
            <NavbarAdmin />

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>


        </main>
    )

}
export default Dashboard
