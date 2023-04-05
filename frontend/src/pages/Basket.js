import { useState, useEffect, useContext } from 'react';
import { BasketContext } from '../contexts/BasketContext'
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

function Basket() {
    const { basket, removeLast, emptyBasket, getItemsWithDetails, removeOne, removeLine, addOneOfThis, getTotalTva, getTotalTtc } = useContext(BasketContext);
    const [basketSummary, setBasketSummary] = useState([]);

    useEffect(() => {
        setBasketSummary(getItemsWithDetails)
    }, [])

    //mettre à jour l'affichage des détails à la modification du panier
    useEffect(() => {
        setBasketSummary(getItemsWithDetails)
    }, [basket])

    return (
        <>
            <main className="basketPage">
                <h1>Votre panier</h1>
                {basketSummary.length > 0 ?
                    <>
                        <Button onClick={emptyBasket} variant="contained" color="warning" startIcon={<RemoveShoppingCartIcon />} >Vider le panier</Button>
                        <Button onClick={removeLast} variant="contained" sx={{ margin: '6px' }} style={{ backgroundColor: "#FFB300", color: 'black' }}>Enlever le dernier article ajouté</Button>
                        <h2>Produits dans votre panier : </h2>
                        {basketSummary.map((articleType, i) => {
                            return (
                                <div key={'article_' + i} style={{
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
                                        <h3>{articleType.title} {articleType.id}</h3>
                                        <p>{articleType.pickedQuantity} unité{articleType.pickedQuantity > 1 && 's'}</p>
                                    </div>
                                    <p>{
                                        Math.round((articleType.totalPrice_ht * (1 + articleType.tva / 100)) * 100) / 100} €</p>
                                    <div>
                                        <Button variant="contained" style={{ backgroundColor: "#FFB300", color: 'black' }} onClick={e => removeOne(articleType.id)}>En enlever un</Button>
                                        <Button variant="contained" color="warning" onClick={e => removeLine(articleType.id)} sx={{ margin: '6px' }}>Tout enlever</Button>
                                        <Button variant="contained" onClick={e => addOneOfThis(articleType)} startIcon={<AddShoppingCartIcon />}>En ajouter un</Button>
                                    </div>
                                </div>
                            )
                        })}
                        <h2>résumé du panier :</h2>
                        <p>Total HT : {Math.floor((basketSummary.reduce((s, pr) => pr.totalPrice_ht + s, 0)) * 100) / 100} €</p>
                        <p>TVA : {Math.floor((getTotalTva()) * 100) / 100} €</p>
                        <p>Total TTC : {Math.floor((getTotalTtc()) * 100) / 100} €</p>
                        <Button variant="contained" sx={{ width: '100%' }}>Passer à la caisse</Button>
                        <p style={{ textAlign: 'center' }}>ou <Link to="/products">continuer à magasiner</Link></p>
                    </>
                    : <p>panier vide</p>}
            </main>
        </>
    );
}

export default Basket;
