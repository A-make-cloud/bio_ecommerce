import { useState, createContext, useEffect } from 'react'
const BasketContext = createContext()

function BasketProvider({ children }) {
    const [basket, setBasket] = useState({ items: [] });

    //Aller chercher le panier dans le local storage dès le début
    useEffect(() => {
        const storedBasket = JSON.parse(localStorage.getItem('basket'))
        setBasket(storedBasket)
    }, [])

    //mettre dans le local storage à chaque fois qu'on le modifie
    useEffect(() => {
        localStorage.setItem("basket", JSON.stringify(basket))
    }, [basket])

    // ajout d'un article
    const addOne = (product) => {
        const storedBasket = JSON.parse(localStorage.getItem('basket'))
        let items = [...storedBasket.items, product]
        setBasket({ items })
    }

    //Enlever dernier article ajouté dans le panier
    const removeLast = () => {
        const storedBasket = JSON.parse(localStorage.getItem('basket'))
        let items = [...storedBasket.items]
        items.pop()
        setBasket({ items })
    }

    //enlever un article, en partant des derniers ajoutés
    const removeOne = (id) => {
        const storedBasket = JSON.parse(localStorage.getItem('basket'))
        let indice = -1
        let items = storedBasket.items
        for (let i = items.length - 1; i >= 0; i--) {
            if (items[i].id === id) {
                indice = i
                break
            }
        }
        items.splice(indice, 1)
        setBasket({ items })
    }

    // à l'origine pour pouvoir en ajouter à partir de son id en requetant la BDD
    const addOneOfThis = (item) => {
        const storedBasket = JSON.parse(localStorage.getItem('basket'))
        let items = storedBasket.items
        items.push(item)
        setBasket({ items })
    }

    //Enlever tout les produits d'un type
    const removeLine = (id) => {
        const storedBasket = JSON.parse(localStorage.getItem('basket'))
        const items = storedBasket.items.filter(elem => elem.id !== id)
        setBasket({ items })
    }

    const emptyBasket = () => {
        setBasket({ items: [] })
    }

    const getTotalTva = () => {
        const storedBasket = JSON.parse(localStorage.getItem('basket'))
        let items = storedBasket.items
        return items.reduce((a, c) => { return a + Number(c.price_ht) * c.tva / 100 }, 0)
    }

    const getTotalTtc = () => {
        const storedBasket = JSON.parse(localStorage.getItem('basket'))
        let items = storedBasket.items
        return items.reduce((a, c) => { return a + Number(c.price_ht) * (1 + c.tva / 100) }, 0)
    }

    //trier les articles avec prix total et nombre
    const getItemsWithDetails = () => {
        const storedBasket = JSON.parse(localStorage.getItem('basket'))
        //liste des articles du panier rangés par produit avec prix totaux et nb d'articles
        const fullBasket = []
        if (storedBasket.items.length === 0) return []
        //pour chq elemnt du panier, le mettre avec les bons articles, et à chaque fois, mettre à jour le nb et le prix total
        for (const item of storedBasket.items) {
            const indice = fullBasket.findIndex(article => article.id === item.id)
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