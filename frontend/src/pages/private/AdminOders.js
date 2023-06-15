import { Button, Alert } from '@mui/material';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import NavbarAdmin from './NavbarAdmin';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityIcon from '@mui/icons-material/Visibility';

function AdminOrders() {
    const colors = {new:'#fffbaa', process:'#aaffb7', expedited:'#aae9ff', canceled:'#dcdcdc'}
    const [orders, setOrders] = useState([]);
    const [color, setColor] = useState('info')
    const [message, setMessage] = useState('Chargement en cours...')
    useEffect(() => {
        fetch(`/commandes/orders`)
        .then(res => {
            if (res.status === 200)
                return res.json()
            else if (res.status === 204) {
                setColor("success")
                setMessage("Il n'y a pas de commandes pour le moment.")
            } else if (res.status === 500) {
                setColor("error")
                setMessage("Une erreur est survenue !")
            }else{
                throw new Error()
            }
        })
        .then(result => {
            setColor("")
            setMessage("")
            setOrders(result.data ?? [])
        })
        .catch(err => { 
            setColor("error")
            setMessage("Une erreur est survenue sur le réseau !")
        })
    }, []);

    /*function deleteRow(id, reference){
        const confirmDelete = window.confirm(`Voulez-vous vraiment supprimer la commande #${reference} ?`)
        if(!confirmDelete) return
        fetch(`/commandes/delete/${id}`)
        .then(res => {
            if (res.status === 204)
                return
            else {
                setColor("error")
                setMessage("La commande n'a pas pu être supprimée")
            }
        })
        .then(result => {
            setColor("success")
            setMessage(`Commande supprimé (#${reference})`)
            setOrders(orders.filter(order => order.id !== id))
        })
        .catch(err => {                
            setColor("error")
            setMessage("Une erreur est survenue") })
    }*/

    const columns = [
        {
            field: 'Commande', headerName: 'Commande', width: 210,
            valueGetter: (params) => { return `#${params.row.reference} ${params.row.firstname} ${params.row.lastname}` }
        },
        {
            field: 'created_at', headerName: 'date création', width: 200,
            valueGetter: (params) => { 
                return params.row.created_at?new Date(params.row.created_at).toLocaleString("fr-FR"):'' 
            }
        },
        {
            field: 'updated_at', headerName: 'Dernière modif.', width: 200,
            valueGetter: (params) => { 
                return params.row.updated_at?new Date(params.row.updated_at).toLocaleString("fr-FR"):'' 
            }
        },
        {
            field: 'state',
            headerName: 'Etat',
            sortable: false,
            width: 80,
            renderCell: (params) => {
                const color = colors[params.row.state]
                return (
                    <div style={{backgroundColor:color}} >
                    &nbsp;{params.row.state}&nbsp;
                    </div>
                );
            },
        },
        {
            field: 'address_factu', headerName: 'Addresse de facturation', width: 210,
            valueGetter: (params) => { return `${params.row.street}, ${params.row.city}` }
        },
        {
            field: 'total', headerName: 'Total HT', width: 90,
            valueGetter: (params) => { return params.row.total?params.row.total+' €':'' }
        },
        {
            field: 'details',
            headerName: '',
            sortable: false,
            width: 80,
            renderCell: (params) => {
                return (
                    <Button
                        component={Link}
                        to={`/dashboard/order/${params.row.id}`}
                        variant="contained"
                        color="primary"
                        sx={{ backgroundColor: '#FFB300', color: 'black' }}
                    >
                        <VisibilityIcon />
                    </Button>
                );
            },
        },
        /*{
            field: 'delete',
            headerName: '',
            sortable: false,
            width: 100,
            renderCell: (params) => {
                return (
                    <Button
                        onClick={()=>deleteRow(params.row.id, params.row.email)}
                        variant="contained"
                        color="warning"
                    >
                        <DeleteForeverIcon />
                    </Button>
                );
            },
        },*/
    ];

    return (
        <div className="adminProductsBody">
            <NavbarAdmin />
            <main className="//adminProductsMain">
                {/* {<h1> Dashbord</h1>} */}
                {message ? <Alert severity={color}>{message}</Alert> : ""}
                <DataGrid
                    autoHeight {...orders.Commande_lines ?? []}
                    loading={message==='Chargement en cours...'}
                    rows={orders}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    /*checkboxSelection*/
                />
            </main>
        </div>
    )
}
export default AdminOrders
