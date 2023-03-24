import { useState, createContext, useEffect } from 'react'

const BasketContext = createContext()

function BasketProvider({ children }) {
    const [basket, setBasket] = useState({ nbItem: 0, items: [], price:0 });

    useEffect(() => {
        //console.log(basket)
    }, [basket])

    const addOne = (productId, priceOne) => {
        let items = [...basket.items, productId]
        let price = basket.price+priceOne
        let nbItem = parseInt(basket.nbItem) + 1
        setBasket({
            //...JSON.parse(JSON.stringify(basket)),
            nbItem,
            items,
            price
        })
    }

    return (
        <BasketContext.Provider value={{ basket, addOne }} >
            {children}
        </BasketContext.Provider>
    )
}
export { BasketContext, BasketProvider }