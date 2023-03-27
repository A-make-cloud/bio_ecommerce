import { useState, useEffect, useContext } from 'react';
import NavBar from '../components/layouts/Navbar.js'
import Footer from '../components/layouts/Footer.js'
import { BasketContext } from '../contexts/BasketContext'
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

function Basket() {
    const { basket, removeLast, emptyBasket, getItemsWithDetails, removeOne, removeLine, addOneOfThis } = useContext(BasketContext);
    const [basketSummary, setBasketSummary] = useState([]);

    useEffect(() => {
        setBasketSummary(getItemsWithDetails)
        //console.log(basket)
    }, [])

    useEffect(() => {
        setBasketSummary(getItemsWithDetails)
    }, [basket])


    return (
        <>
            <NavBar />
            <main className="basketPage">
                <h1>Votre panier</h1>
                {basketSummary.length > 0 ?
                    <>
                        <Button onClick={emptyBasket} variant="contained" color="error" startIcon={<RemoveShoppingCartIcon />} >Vider le panier</Button>
                        <Button onClick={removeLast} variant="contained" sx={{margin:'6px'}} color="warning">Enlever le dernier article ajouté</Button>
                        <h2>Produits dans votre panier : </h2>

                        {basketSummary.map((articleType, i) => {
                            return (
                                <div key={'article_' + i} style={{display:'flex', justifyContent:'space-between', margin:'20px 0', 
                                padding:'10px', borderRadius:'8px',
                                boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
                                }}>
                                    <div style={{width:'100px', height:'100px', backgroundImage: `url(https://placehold.co/600x400)`, backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center', backgroundSize: 'cover'}}>
                                    </div>
                                    <div>
                                        <h3>{articleType.name} {articleType.id}</h3>
                                        <p>{articleType.pickedQuantity} article{articleType.pickedQuantity>1 && 's'}</p>
                                    </div>
                                    <p>{articleType.totalPrice_ht} €</p>
                                    <div>
                                        <Button variant="contained" color="warning" onClick={e=>removeOne(articleType.id)}>En enlever un</Button>
                                        <Button variant="contained" color="error" onClick={e=>removeLine(articleType.id)} sx={{margin:'6px'}}>Tout enlever</Button>
                                        <Button variant="contained" onClick={e=>addOneOfThis(articleType.id)} startIcon={<AddShoppingCartIcon />}>En ajouter un</Button>
                                    </div>
                                </div>
                            )
                        })}

                        <h2>résumé du panier :</h2>

                        <p>total : {Math.floor( (basketSummary.reduce((s, pr) => pr.totalPrice_ht + s, 0) ) * 100) / 100} €</p>

                        <Button variant="contained" sx={{width:'100%'}}>Passer à la caisse</Button>
                        <p style={{textAlign:'center'}}>ou <Link to="/products">continuer à magasiner</Link></p>

                    </>
                    : <p>panier vide</p>}
            </main>
            <Footer />
        </>
    );
}

export default Basket;
