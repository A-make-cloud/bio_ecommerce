import { useState, useEffect } from 'react';
import NavbarAdmin from './NavbarAdmin';
import { Link } from "react-router-dom";
import { Alert } from '@mui/material';

function Dashboard() {
    const [color, setColor] = useState('info')
    const [message, setMessage] = useState('Chargement en cours...')
    const [adminSummary, setAdminSummary] = useState({});

    useEffect(() => {
        /*Promise.allSettled([ 
            fetch("/admin/summary").then((res) => res.json()),
            fetch("/products/out-of-stockk").then((res) => res.json()),
          ])
            .then(([summary, outOfStock]) => {
                setAdminSummary({
                    totalProd:summary.value.data[0].total + summary.value.data[1].total, 
                    activProd:summary.value.data[0].total ,
                    outOfStock:outOfStock.value.results[0].total,
                    lowStock:outOfStock.value.results[1].total})
            })
            .catch((err) => console.error(err));*/
        //Il est préférable de faire qu'un seul fetch et de traiter avec la bdd côté serveur en une seul requete SQL
        fetch("/admin/summary")
        .then((res) => {
            if(res.status === 200)
                return res.json()
            else if(res.status === 500){
                setColor("error")
                setMessage("Une erreur est survenue !")
            }else
                throw new Error()
        }).then((result) => {
            setColor("")
            setMessage("")
            setAdminSummary(result.overview)
        }).catch((err) => {
            console.log(err)
            setColor("error")
            setMessage("Une erreur est survenue sur le réseau !")
        })
    }, []);

    return (
        <div className="adminBody">
            <NavbarAdmin />
            <main>
                <h1>Espace d'administration</h1>
                <h2>Résumé des informations :</h2>
                {message ? <Alert severity={color}>{message}</Alert> : ""}                
                <p>Il y a <b>{adminSummary?.totalProd}</b> <Link to="/dashboard/products">produits</Link> enregistrés, dont <b>{adminSummary?.activProd}</b> proposés à la vente.</p>
                <p>Il y a <b>{adminSummary?.outOfStock}</b> produits en rupture de stock, et <b>{adminSummary?.lowStock}</b> produits en faible quantité.</p>
                <p>Les produits sont répartis en <b>{adminSummary?.totalCateg}</b> <Link to="/dashboard/categories">catégories</Link>.</p>
                <p>Il y a <b>{adminSummary?.newOrders}</b> <Link to="/dashboard/commands">commande{adminSummary?.newOrders!==0 && 's'}</Link> en attente de traitement, et <b>{adminSummary?.ordersInProccess}</b> commande{adminSummary?.ordersInProccess!==0 && 's'} en cours de traitement.</p>
                <p>Il y a <b>{adminSummary?.totalUsers}</b> <Link to="/dashboard/users">utilisateurs</Link>, dont <b>{adminSummary?.newUsers}</b> nouveaux cette semaine.</p>
            </main>
        </div>
    )
}
export default Dashboard
