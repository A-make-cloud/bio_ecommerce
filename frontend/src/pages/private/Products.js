import { Button, Alert } from '@mui/material';
import { Link } from "react-router-dom";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import NavbarAdmin from './NavbarAdmin';
import EditIcon from '@mui/icons-material/Edit';

function ProductsComponent() {
    const [products, setProducts] = useState([]);
    const [color, setColor] = useState('info')
    const [message, setMessage] = useState('Chargement en cours...')

    //let rows = []
    useEffect(() => {
        fetch(`/products/admin-find-all?offset=0&limit=1000`)
        .then(res => {
            if (res.status !== 200 && res.status !== 204){
                setColor("error")
                setMessage("Une erreur est survenue")
                throw new Error()
            }
            return res.json()
        })
        .then(result => {
            setColor("")
            setMessage("")
            setProducts(result.data??[])
        })
        .catch(err=>{
        })
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', flex:1 },
        { field: 'category_id', headerName: 'Catégory', flex:1 },
        { field: 'title', headerName: 'Titre produit', width: 130 },
        { field: 'description', headerName: 'Description', width: 180 },
        { field: 'price_ht', headerName: 'Prix HT', width: 90},
        { field: 'tva', headerName: 'TVA', flex:1 },
        { field: 'quantity', headerName: 'Quantité', flex:1 },
        { field: 'status', headerName: 'Status', flex:1 },
        { field: 'top', headerName: 'Top', flex:1 },
        {
            field: 'createdAt', headerName: 'Date création', width: 160,
            valueGetter: (params) => { return new Date(params.row.createdAt).toLocaleString("fr-FR") }
        },
        {
            field: 'updatedAt', headerName: 'Date m.à.j', width: 160,
            valueGetter: (params) => { return new Date(params.row.updatedAt).toLocaleString("fr-FR") }
        },
        {
            field: 'actions',
            headerName: '',
            sortable: false,
            width: 100,
            renderCell: (params) => {
              return (
                <Button
                  component={Link}
                  to={`/dashboard/product/update/${params.id}`}
                  variant="contained"
                  color="primary"
                  sx={{backgroundColor:'#FFB300', color:'black'}}
                >
                  <EditIcon/>
                </Button>
              );
            },
          },
        //{ field: '', headerName: '', width: 60 },EditIcon
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
                    slots={{
                        noRowsOverlay: ()=>{
                            return (<>{message ? <Alert severity={color}>{message}</Alert> : ""}</>); 
                        },
                    }}
                    rows={products}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </main>
        </div>
    )
}
export default ProductsComponent
