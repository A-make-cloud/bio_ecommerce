import { useState, createContext, useEffect } from 'react'
import fakeData from '../components/products/fakeData';

const BasketContext = createContext()

function BasketProvider({ children }) {
    const [basket, setBasket] = useState({ items: [] });

    useEffect(() => {
        const storedBasket = JSON.parse(localStorage.getItem('basket'))
        setBasket(storedBasket)
    }, [])

    useEffect(() => {
        localStorage.setItem("basket", JSON.stringify(basket))
        const storedBasket = JSON.parse(localStorage.getItem('basket'))
        console.log(storedBasket)
    }, [basket])

    const addOne = (productId) => {
        const storedBasket = JSON.parse(localStorage.getItem('basket'))
        let items = [...storedBasket.items, productId]
        setBasket({ items })
    }

    const removeLast = () => {
        const storedBasket = JSON.parse(localStorage.getItem('basket'))
        let items = storedBasket.items.slice(-1)
        setBasket({ items })
    }

    const emptyBasket = () => {
        setBasket({ items: [] })
    }

    const getItemsWithDetails = () => {
        const storedBasket = JSON.parse(localStorage.getItem('basket'))
        const fullBasket = []
        if (storedBasket.items.length === 0) return []
        for (const item of storedBasket.items) {
            //const indice = subCart.map(i => i.name).indexOf(article.name)
            const indice = fullBasket.findIndex(article => article.id === item)
            const ItemType = fakeData.find(data => data.id === item)
            if (indice === -1) {
                fullBasket.push({ ...ItemType, pickedQuantity: 1, totalPrice_ht: ItemType.price_ht })
            } else {
                //fullBasket[indice].price = Math.floor((subCart[indice].price + article.price) * 100) / 100
                fullBasket[indice].totalPrice_ht = Math.floor((fullBasket[indice].totalPrice_ht + ItemType.price_ht) * 100) / 100
                fullBasket[indice].pickedQuantity++
            }
        }
        return fullBasket
    }

    return (
        <BasketContext.Provider value={{ basket, addOne, getItemsWithDetails }} >
            {children}
        </BasketContext.Provider>
    )
}
export { BasketContext, BasketProvider }