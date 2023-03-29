import { useState, createContext, useEffect } from 'react'
//import fakeData from '../components/products/fakeData';

const BasketContext = createContext()

function BasketProvider({ children }) {
    const [basket, setBasket] = useState({ items: [] });

    useEffect(() => {
        const storedBasket = JSON.parse(localStorage.getItem('basket'))
        //console.log(fetchOneProduct(1))
        setBasket(storedBasket)
    }, [])

    useEffect(() => {
        localStorage.setItem("basket", JSON.stringify(basket))
        //const storedBasket = JSON.parse(localStorage.getItem('basket'))
        //console.log(storedBasket)
    }, [basket])

    const addOne = (product) => {
        const storedBasket = JSON.parse(localStorage.getItem('basket'))
        let items = [...storedBasket.items, product]
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
            if (items[i].id===id){
                indice=i
                break
            }      
        }
        items.splice(indice, 1)
        setBasket({ items })
    }

    const addOneOfThis = (item) => {
        const storedBasket = JSON.parse(localStorage.getItem('basket'))
        let items =storedBasket.items
        items.push(item)
        setBasket({ items })
    }

    const removeLine = (id) => {
        const storedBasket = JSON.parse(localStorage.getItem('basket'))
        const items = storedBasket.items.filter(elem=>elem.id!==id)
        setBasket({ items })
    }

    const emptyBasket = () => {
        setBasket({ items: [] })
    }

    const getTotalTva = () => {
        const storedBasket = JSON.parse(localStorage.getItem('basket'))
        let items =storedBasket.items
        return items.reduce((a, c)=>{return a + Number(c.price_ht)*c.tva/100}, 0)
    }

    const getTotalTtc = () => {
        const storedBasket = JSON.parse(localStorage.getItem('basket'))
        let items =storedBasket.items
        return items.reduce((a, c)=>{return a + Number(c.price_ht)*(1 + c.tva/100)}, 0)
    }

    /*async function fetchOneProduct(id) {
        const response = await fetch(`/products/find/${id}`)
        if (response.status !== 500) {
            const json = response.json()
            console.log(json)
            return(json.data)
        } else {
            return ('probleme récupération des produits')
        }
    }*/
    /*const getItemsWithDetails = () => {
        const storedBasket = JSON.parse(localStorage.getItem('basket'))
        //liste des articles du panier rangés par produit avec prix totaux et nb d'articles
        const fullBasket = []
        if (storedBasket.items.length === 0) return []
        //pour chq elemnt du panier, le mettre avec les bons articles, et à chaque fois, mettre à jour le nb et le prix total
        
        for (const item of storedBasket.items) {
            const indice = fullBasket.findIndex(article => article.id === item)
            const ItemType = fakeData.find(data => data.id == item)
            if (indice === -1) {
                fullBasket.push({ ...ItemType, pickedQuantity: 1, totalPrice_ht: ItemType.price_ht })
            } else {
                fullBasket[indice].totalPrice_ht = Math.floor((fullBasket[indice].totalPrice_ht + ItemType.price_ht) * 100) / 100
                fullBasket[indice].pickedQuantity++
            }
        }
        return fullBasket
    }*/

    const getItemsWithDetails = () => {
        const storedBasket = JSON.parse(localStorage.getItem('basket'))
        //liste des articles du panier rangés par produit avec prix totaux et nb d'articles
        const fullBasket = []
        if (storedBasket.items.length === 0) return []
        //pour chq elemnt du panier, le mettre avec les bons articles, et à chaque fois, mettre à jour le nb et le prix total
        for (const item of storedBasket.items) {
            const indice = fullBasket.findIndex(article => article.id === item.id)
            //const ItemType = fakeData.find(data => data.id == item)
            if (indice === -1) {
                fullBasket.push({ ...item, pickedQuantity: 1, totalPrice_ht: Number(item.price_ht) })
            } else {
                fullBasket[indice].totalPrice_ht = Math.floor((Number(fullBasket[indice].totalPrice_ht) + Number(item.price_ht)) * 100) / 100
                fullBasket[indice].pickedQuantity++
            }
        }
        return fullBasket
    }

    return (
        <BasketContext.Provider value={{ basket, addOne, getItemsWithDetails, emptyBasket, removeLast, removeOne, removeLine, addOneOfThis, getTotalTva, getTotalTtc }} >
            {children}
        </BasketContext.Provider>
    )
}
export { BasketContext, BasketProvider }