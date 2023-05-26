import { Button, Alert } from '@mui/material';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import NavbarAdmin from './NavbarAdmin';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function UsersComponent() {
    const [users, setUsers] = useState([]);
    const [color, setColor] = useState('info')
    const [message, setMessage] = useState('Chargement en cours...')
    useEffect(() => {
        fetch(`/users/find-all`)
            .then(res => {
                if (res.status === 200)
                    return res.json()
                else if (res.status === 204) {
                    setColor("warning")
                    setMessage("Pas d'utilisateurs à afficher")
                } else {
                    throw new Error()
                }
            })
            .then(result => {
                setColor("")
                setMessage("")
                setUsers(result.data ?? [])
            })
            .catch(err => { 
                setColor("error")
                setMessage("Une erreur est survenue")
            })
    }, []);

    function deleteRow(id, email){
        const confirmDelete = window.confirm(`Voulez vous vraiment supprimer l'utilisateur ${email} ?`)
        if(!confirmDelete) return
        fetch(`/users/delete/${id}`, {
            method: 'DELETE',
            credentials: 'include', // inclus les cookies dans la requête
            })
        .then(res => {
            if (res.status === 204){
                setColor("success")
                setMessage(`Utilisateur supprimé ! (${email})`)
                setUsers(users.filter(cat => cat.id !== id))
            } else {
                console.log(res)
                setColor("error")
                setMessage("L'utilisateur n'a pas pu être supprimé")
            }
        })
        .catch(err => {                
            setColor("error")
            setMessage("Une erreur est survenue") })
    }

    const columns = [
        { field: 'civility', headerName: 'Civilité', width: 60 },
        { field: 'firstname', headerName: 'Prénom', width: 130 },
        { field: 'lastname', headerName: 'Nom', width: 130 },
        { field: 'profil', headerName: 'Rôle', width: 80 },
        { field: 'email', headerName: 'Couriel', width: 170 },
        { field: 'status', headerName: 'Statu', flex: 1 },
        {
            field: 'created_at', headerName: 'date inscription', width: 200,
            valueGetter: (params) => { return new Date(params.row.createdAt).toLocaleString("fr-FR") }
        },
        {
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
        },
    ];

    return (
        <div className="adminProductsBody">
            <NavbarAdmin />
            <main className="//adminProductsMain">
                {/* {<h1> Dashbord</h1>} */}
                {message ? <Alert severity={color}>{message}</Alert> : ""}
                <DataGrid
                autoHeight {...users ?? []}
                    loading={message==='Chargement en cours...'}
                    rows={users}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    /*checkboxSelection*/
                />
            </main>
        </div>
    )
}
export default UsersComponent
