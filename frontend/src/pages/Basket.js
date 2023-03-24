import { useState, useRef, useEffect, useContext } from 'react';
import fakeData from '../components/products/fakeData';
import NavBar from '../components/layouts/Navbar.js'
import Footer from '../components/layouts/Footer.js'
import { BasketContext } from '../contexts/BasketContext'

function Basket() {
    const { basket, addOne, removeLast, emptyBasket, getItemsWithDetails, removeOne, removeLine, addOneOfThis } = useContext(BasketContext);
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
                        <button onClick={emptyBasket}>Vider panier</button>
                        <button onClick={removeLast}>Enlever le dernier article ajouté</button>

                        <table className="basketTable">
                            <thead>
                                <tr><th>Article</th><th>Nombre</th><th>Prix</th><th></th><th></th><th></th></tr>
                            </thead>
                            <tbody>

                                {basketSummary.map((articleType, i) => {
                                    return (
                                        <tr key={'article_' + i}>
                                            <td>{articleType.name} {articleType.id}</td>
                                            <td>{articleType.pickedQuantity}</td>
                                            <td>{articleType.totalPrice_ht}</td>
                                            <td><button onClick={e=>removeOne(articleType.id)}>En enlever un</button></td>
                                            <td><button onClick={e=>removeLine(articleType.id)}>Tout enlever</button></td>
                                            <td><button onClick={e=>addOneOfThis(articleType.id)}>En ajouter un</button></td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td>articles : {basket.items.length}</td>
                                    <td>total : {Math.floor( (basketSummary.reduce((s, pr) => pr.totalPrice_ht + s, 0) ) * 100) / 100}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </table>

                    </>
                    : <p>panier vide</p>}
            </main>
            <Footer />
        </>
    );
}

export default Basket;
//<div key={'prod_' + i}>{articleType.name} {articleType.id} {articleType.pickedQuantity} {articleType.totalPrice_ht}</div>
/*
<div>
<h3>Votre panier :</h3>
<p v-if="!submaryCart">Votre panier est vide</p>
<table v-else class="table table-hover">
  <thead>
    <tr><th>Article</th><th>Nombre</th><th>Prix</th><th></th><th></th></tr>
  </thead>
  <tbody>

    <tr key=''>
      <td>{article.name}</td>
      <td>{article.number}</td>
      <td>{article.price}</td>
      <td><button>enlever 1</button></td>
      <td><button>tout enlever</button></td>
    </tr>

  </tbody>
  <tfoot>
    <tr>
      <td></td>
      <td>total : {cartOverview.nb}</td>
      <td>total : {cartOverview.price}</td>
      <td></td>
      <td></td>
    </tr>
</tfoot>
</table>
</div>*/