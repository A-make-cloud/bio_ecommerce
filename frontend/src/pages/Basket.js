import { useState, useRef, useEffect, useContext } from 'react';
import fakeData from '../components/products/fakeData';
import NavBar from '../components/layouts/Navbar.js'
import Footer from '../components/layouts/Footer.js'
import { BasketContext } from '../contexts/BasketContext'

function Basket() {
    const { basket, addOne, getItemsWithDetails } = useContext(BasketContext);
    const [basketSummary, setBasketSummary] = useState([]);

    useEffect(() => {
        setBasketSummary(getItemsWithDetails)
        console.log(basket)
    }, [])

    useEffect(() => {
        setBasketSummary(getItemsWithDetails)
    }, [basket])


    return (
        <>
            <NavBar />
            <main >
                <h1>Votre panier</h1>
                {basketSummary.length > 0 && basketSummary.map((articleType, i) => {
                    return (
                        <div key={'prod_' + i}>{articleType.name} {articleType.id} {articleType.pickedQuantity} {articleType.totalPrice_ht}</div>
                    )
                })}
            </main>
            <Footer />
        </>
    );
}

export default Basket;