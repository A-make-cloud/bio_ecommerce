import { useState, createContext, useEffect } from 'react'
import fakeData from '../components/products/fakeData';

const BasketContext = createContext()

function BasketProvider({ children }) {
    const [basket, setBasket] = useState({ items: [] });

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
        setBasket({ items:[] })
    }

    return (
        <BasketContext.Provider value={{ basket, addOne }} >
            {children}
        </BasketContext.Provider>
    )
}
export { BasketContext, BasketProvider }