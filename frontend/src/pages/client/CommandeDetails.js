import NavbarClient from './NavbarClient';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Link, useParams } from "react-router-dom";

export default function Commande() {
    const params = useParams()
    const orderId = params.id;
    const [lines, setLines] = useState({});

    useEffect(() => {
        fetch("/commandes/order-details/" + orderId).then((res) => res.json())
            .then((result) => {
                setLines(result.data)
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="clientBody">
            <NavbarClient />
            <div className="clientContent">
                <h1>Détails de la commande # {lines?.reference} {lines?.createdAt ?? ''}</h1>
                {lines.length === 0 && <p>Vous n'avez pas de commande en cours</p>}
                {lines?.Commande_lines?.map((line, i) => {
                    return (
                        <div key={'line_' + i} style={{
                            display: 'flex', justifyContent: 'space-between', margin: '20px 0',
                            padding: '10px', borderRadius: '8px',
                            boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
                        }}>
                            <div style={{
                                width: '100px', height: '100px', backgroundImage: `url(https://placehold.co/450x400)`, backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center', backgroundSize: 'cover'
                            }}>
                            </div>
                            <div>
                                <h3> {line.Product.title} </h3>
                                <p>{line.quantity} unité{line.quantity > 1 && 's'}, {Math.round((line.price_ht * (1 + line.tva / 100)) * 100) / 100} €</p>
                            </div>
                            <div style={{ alignSelf: 'center', marginLeft: '10px' }}>
                                <Button variant="contained" style={{ backgroundColor: "#FFB300", color: 'black' }}><Link underline="none" to={`/product/${line.product_id}`}>Voir la fiche du produit</Link></Button>
                            </div>
                        </div>
                    )
                }
                )}
                <h2>Total de la commande :</h2>
                <p>Total HT : {Math.floor((lines?.Commande_lines?.reduce((sum, cur) => Number(cur.price_ht) + sum, 0)) * 100) / 100} €</p>
                <p>TVA : {Math.floor((lines?.Commande_lines?.reduce((sum, cur) => (Number(cur.price_ht) * Number(cur.tva) / 100) + sum, 0)) * 100) / 100} €</p>
                <p>Total TTC : <b>{Math.floor((lines?.Commande_lines?.reduce((sum, cur) => (Number(cur.price_ht) * (Number(cur.tva) + 100) / 100) + sum, 0)) * 100) / 100} €</b></p>
                <p>*Les frais de livraison ne sont pas inclus</p>
                <p>Référence payement : {lines?.payement_ref??<i>Pas de réf. payement, vérifiez que le payement a bien été validé</i>}</p>
                <Link to="/client/commandes"><Button variant="contained" sx={{ /*width: '100%',*/ backgroundColor: "#FFB300", color: 'black', marginBottom: '10px' }}>Revenir à la liste de vos commandes</Button></Link>
            </div>
        </div>)
}
