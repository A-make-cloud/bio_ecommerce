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
        //const storedBasket = JSON.parse(localStorage.getItem('basket'))
        //console.log(storedBasket)
    }, [basket])

    const addOne = (productId) => {
        const storedBasket = JSON.parse(localStorage.getItem('basket'))
        let items = [...storedBasket.items, productId]
        setBasket({ items })
    }

    const removeLast = () => {
        const storedBasket = JSON.parse(localStorage.getItem('basket'))
        let items = [...storedBasket.items]
        items.pop()
        setBasket({ items })
    }

    const removeOne = (id) => {
        const storedBasket = JSON.parse(localStorage.getItem('basket'))
        let indice = -1
        let items =storedBasket.items
        for (let i = items.length-1; i>=0; i--){
            if (items[i]===id){
                indice=i
                break
            }      
        }
        items.splice(indice, 1)
        setBasket({ items })
    }

    const addOneOfThis = (id) => {
        const storedBasket = JSON.parse(localStorage.getItem('basket'))
        let items =storedBasket.items
        items.push(id)
        setBasket({ items })
    }

    const removeLine = (id) => {
        const storedBasket = JSON.parse(localStorage.getItem('basket'))
        const items = storedBasket.items.filter(elem=>elem!==id)
        setBasket({ items })
    }

    const emptyBasket = () => {
        setBasket({ items: [] })
    }

    const getItemsWithDetails = () => {
        const storedBasket = JSON.parse(localStorage.getItem('basket'))
        /*liste des articles du panier rangés par produit avec prix totaux et nb d'articles*/
        const fullBasket = []
        if (storedBasket.items.length === 0) return []
        //pour chq elemnt du panier, le mettre dans le bon article et pour chaque, mettre à jour le nb et le prix total
        for (const item of storedBasket.items) {
            const indice = fullBasket.findIndex(article => article.id === item)
            const ItemType = fakeData.find(data => data.id === item)
            if (indice === -1) {
                fullBasket.push({ ...ItemType, pickedQuantity: 1, totalPrice_ht: ItemType.price_ht })
            } else {
                fullBasket[indice].totalPrice_ht = Math.floor((fullBasket[indice].totalPrice_ht + ItemType.price_ht) * 100) / 100
                fullBasket[indice].pickedQuantity++
            }
        }
        return fullBasket
    }

    return (
        <BasketContext.Provider value={{ basket, addOne, getItemsWithDetails, emptyBasket, removeLast, removeOne, removeLine, addOneOfThis }} >
            {children}
        </BasketContext.Provider>
    )
}
export { BasketContext, BasketProvider }