import { Button, Alert } from '@mui/material';
import { Link } from "react-router-dom";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import NavbarAdmin from './NavbarAdmin';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function CategoriesComponent() {
    const [categories, setCategories] = useState([]);
    const [color, setColor] = useState('info')
    const [message, setMessage] = useState('Chargement en cours...')
    useEffect(() => {
        fetch(`/categories/find-all-details`)
            .then(res => {
                if (res.status === 200)
                    return res.json()
                else if (res.status === 204) {
                    setColor("warning")
                    setMessage("Pas de categories à afficher")
                    throw new Error()
                } else {
                    setColor("error")
                    setMessage("Une erreur est survenue")
                    throw new Error()
                }
            })
            .then(result => {
                setColor("")
                setMessage("")
                setCategories(result.data ?? [])
            })
            .catch(err => { })
    }, []);

    function deleteRow(id){
        const confirmDelete = window.confirm(`Voulez vous vraiment supprimer la catégorie #${id} ?`)
        if(!confirmDelete) return
        fetch(`/categories/delete/${id}`)
        .then(res => {
            if (res.status === 204)
                return
            else {
                setColor("error")
                setMessage("La catégorie n'a pas pu être supprimée")
            }
        })
        .then(result => {
            setColor("success")
            setMessage(`Categorie #${id} supprimée`)
            setCategories(categories.filter(cat => cat.id !== id))
        })
        .catch(err => {                
            setColor("error")
            setMessage("Une erreur est survenue") })
    }

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'title', headerName: 'Titre', width: 150 },
        { field: 'description', headerName: 'Description', width: 150 },
        { field: 'img', headerName: 'Image', width: 110 },
        { field: 'top', headerName: 'Top', width: 40 },
        {
            field: 'background',
            headerName: 'Couleur',
            sortable: false,
            width: 100,
            renderCell: (params) => {
                return (<p style={{background:params.row.background}}>{params.row.background}</p>)
            }
        },
        { field: 'status', headerName: 'Statu', flex: 1 },
        { field: 'nb_products', headerName: 'Produits associés', flex: 1 },
        {
            field: 'created_at', headerName: 'Date création', width: 200,
            valueGetter: (params) => { return new Date(params.row.createdAt).toLocaleString("fr-FR") }
        },
        {
            field: 'update',
            headerName: '',
            sortable: false,
            width: 100,
            renderCell: (params) => {
                return (
                    <Button
                        component={Link}
                        to={`/dashboard/categories/update/${params.row.id}`}
                        variant="contained"
                        color="primary"
                        sx={{ backgroundColor: '#FFB300', color: 'black' }}
                    >
                        <EditIcon />
                    </Button>
                );
            },
        },
        {
            field: 'delete',
            headerName: '',
            sortable: false,
            width: 100,
            renderCell: (params) => {
                return (
                    <Button
                        onClick={()=>deleteRow(params.row.id)}
                        variant="contained"
                        color="warning"
                    >
                        <DeleteForeverIcon />
                    </Button>
                );
            },
        },
    ];

    return (
        <div className="adminProductsBody">
            <NavbarAdmin />
            <main className="adminProductsMain">
                
                {/* {<h1> Dashbord</h1>} */}
                {message ? <Alert severity={color}>{message}</Alert> : ""}
                <DataGrid
                    autoHeight {...categories ?? []}
                    loading={message==='Chargement en cours...'}
                    rows={categories}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    sx={{height:'500px'}}
                /*checkboxSelection*/
                />
                <Link to="/dashboard/categories/add">
                    <Button variant="contained" sx={{ backgroundColor: "#FFB300", color: 'black' }}>
                        <ControlPointIcon/>Ajouter une catégorie
                    </Button>
                </Link>    
                    
                    
                    {/*<Button
                        component={Link}
                        to={`/dashboard/categories/add`}
                        variant="contained"
                        color="primary"
                        sx={{ backgroundColor: '#FFB300', color: 'black' }}
                    >
                        <ControlPointIcon/>Ajouter une catégorie
                </Button>*/}

            </main>
        </div>
    )
}
export default CategoriesComponent
