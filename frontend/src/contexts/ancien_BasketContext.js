import { useState, createContext, useEffect } from 'react'
import fakeData from '../components/products/fakeData';
const BasketContext = createContext()

function BasketProvider({ children }) {
    const [basket, setBasket] = useState({ items: [] });

    // A REVOIR TROP DE USEFFECT !!


    // Charger le panier depuis le localStorage au chargement de la page
    useEffect(() => {
        const storedBasket = JSON.parse(localStorage.getItem('basket'))
        if(storedBasket) {
            setBasket(storedBasket)
        }
    }, [])


    //Sauvegarde
    useEffect(() => {
        localStorage.setItem("basket", JSON.stringify(basket))
    }, [basket])


    // ADD

        //Ajouter un produit au panier
    const addOne = (productId) => {
        let items = [...basket.items, productId]
        setBasket({ items })
    }

    const addOneOfThis = (id) => {
        let items = [...basket.items];
        items.push(id);
        setBasket({items})
    }

    // REMOVE

    const removeLast = () => {
        let items = [...basket.items]
        items.pop()
        setBasket({ items })
    }

    const removeOne = (id) => {
        let indice = -1
        let items = [...basket.items];
        for (let i = items.length-1; i>=0; i--){
            if (items[i]===id){
                indice=i
                break
            }
        }
        items.splice(indice, 1)
        setBasket({ items })
    }


    const removeLine = (id) => {
        const items = basket.items.filter((elem) => elem !== id)
        setBasket({ items })
    }

    // EMPTY

    const emptyBasket = () => {
        setBasket({ items: [] })
    }
    async function getItemsWithDetails() {
        const storedBasket = JSON.parse(localStorage.getItem('basket'));
        const fullBasket = [];
    
        if (storedBasket.items.length === 0) return [];
    
        for (const item of storedBasket.items) {
            console.log(item)
            const product = await fetchOneProduct(item);
            
            const indice = fullBasket.findIndex((article) => {return article.id === product.id});
    
            if (indice === -1) {
                fullBasket.push({ ...product, pickedQuantity: 1, totalPrice_ht: product.price_ht });
            } else {
                console.log( Math.floor((fullBasket[indice].totalPrice_ht + product.price_ht) * 100) / 100)
                fullBasket[indice].totalPrice_ht = Math.floor((fullBasket[indice].totalPrice_ht + product.price_ht) * 100) / 100;
                fullBasket[indice].pickedQuantity++;
            }
        }
    
        return fullBasket;
    }

    async function fetchOneProduct(id) {
        const response = await fetch(`/products/find/${id}`)
        if (response.status !== 500) {
            const json = response.json()
            //console.log(json)
            return(json.data)
        } else {
            return ('probleme récupération des produits')
        }
    }

    return (
        <BasketContext.Provider value={{ basket, addOne, getItemsWithDetails, emptyBasket, removeLast, removeOne, removeLine, addOneOfThis }} >
            {children}
        </BasketContext.Provider>
    )
}
export { BasketContext, BasketProvider }