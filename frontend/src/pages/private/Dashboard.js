import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import NavbarAdmin from './NavbarAdmin';

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
                //console.log(json.data)
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
        { field: 'id', headerName: 'ID', flex:1 },
        { field: 'category_id', headerName: 'Catégory', flex:1 },
        { field: 'title', headerName: 'Titre produit', width: 130 },
        // {
        //   field: 'age',
        //   headerName: 'Age',
        //   type: 'number',
        //   width: 90,
        // },
        { field: 'description', headerName: 'Description', width: 180 },
        { field: 'price_ht', headerName: 'Prix HT', width: 90},
        { field: 'tva', headerName: 'TVA', flex:1 },
        { field: 'quantity', headerName: 'Quantité', flex:1 },
        { field: 'status', headerName: 'Status', flex:1 },
        { field: 'top', headerName: 'Top', flex:1 },
        { field: 'createdAt', headerName: 'Créé le', width: 160 },
        { field: 'updatedAt', headerName: 'mis à jour le', width: 160 },
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
        <div className="adminProductsBody">
            <NavbarAdmin />
            <main className="adminProductsMain">
                {/* {<h1> Dashbord</h1>} */}

                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </main>
        </div>
    )
}
export default Dashboard
