import NavbarClient from './NavbarClient';
import { useState, useEffect } from 'react';
import { Button, Alert } from '@mui/material';
import { Link } from "react-router-dom";

export default function Commande() {
    const [color, setColor] = useState('info')
    const [message, setMessage] = useState('Chargement en cours...')
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch("/commandes/my-orders")
        .then((res) => {
            if(res.status !== 200 && res.status !== 204) {
                setColor("error")
                setMessage("Une erreur est survenue")
                throw new Error()
            }else if(res.status === 204){
                setColor("info")
                setMessage("Vous n'avez pas de commande en cours")
            }
            return res.json()})
        .then((result) => {
            if(result.data?.length===0){
                setColor("info")
                setMessage("Vous n'avez pas de commande en cours")
                return
            }
            setColor("")
            setMessage("")
            setOrders(result.data)
        })
        .catch((err) => {});
    }, []);

    return (
        <div className="clientBody">
            <NavbarClient />
            <div className="clientContent">
                <h1>Mes commandes </h1>
                {message ? <Alert severity={color}>{message}</Alert> : ""}
                {/*orders?.length===0 && <p>Vous n'avez pas de commande en cours</p>*/}
                {orders.map((order, i)=>{
                    return (
                        <div key={'cLine_' + i} style={{
                            display: 'flex', justifyContent: 'space-between', margin: '20px 0',
                            padding: '10px', borderRadius: '8px',
                            boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
                        }}>
                            <div>
                                <h3>Commande {order.reference} : </h3>
                                <p>Addresse de livraison : {order.deliveryAddress.street}, {order.deliveryAddress?.complement && order.deliveryAddress.complement+', '}{order.deliveryAddress.city}, {order.deliveryAddress.zipcode}{order.deliveryAddress?.information && ', "'+order.deliveryAddress.information+'"'}</p>
                                <p>Adresse de facturation : {order.billingAddress.street}, {order.billingAddress?.complement && order.billingAddress.complement+','} {order.billingAddress.city}, {order.billingAddress.zipcode}{order.billingAddress?.information && ', '+order.billingAddress.information}</p>
                            </div>
                            <p>{order.created_at && 'Date : '+order.created_at}</p>
                            <div style={{alignSelf:'center', marginLeft:'10px'}}>
                                <Button variant="contained" style={{ backgroundColor: "#FFB300", color: 'black' }}><Link to={`/client/commande-details/${order.id}`} underline="none">Détails du contenu</Link></Button>

                            </div>
                        </div>
                    )
                })}
            </div>
        </div>)
}
