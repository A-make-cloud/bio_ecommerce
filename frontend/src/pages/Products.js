import Categories from '../components/products/Categories'
import ProductCard from '../components/products/ProductCard'
import { useState, useRef, useEffect } from 'react'
import SyncIcon from '@mui/icons-material/Sync'
import { Alert } from '@mui/material'
import { Link } from "react-router-dom"
function Products() {
  const batchSize = 6
  let batchOffset = 0
  let productsSaved = []
  const [color, setColor] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [chosenCategories, setChosenCategories] = useState([])
  const spinnerRef = useRef()
  //get from server the categories when we land on the page
  async function fetchCat() {
    const response = await fetch('/categories/find-all')
    if (response.status === 200) {
      const json = await response.json()
      setCategories(json.data)
    } else {
      setColor("error")
      setMessage("Un problème est survenu !")
      setCategories([{ id: 1, title: ' ', img: "https://placehold.co/600x400" }])
    }
  }
  fetchCat()
  //Modify the display of the products when a category is selected
  useEffect(() => {
    setProducts([...products])
  }, [chosenCategories])

  useEffect(() => {
    if (spinnerRef.current) {
      observer.observe(spinnerRef.current);
    }
  }, [])
  const observer = new IntersectionObserver(([elem]) => {
    if (elem.isIntersecting) {
      getBatch()
      //need to unobserve to be able to restart it
      observer.unobserve(elem.target)
    }
  })

  //get from server a new product batch
  function getBatch() {
    fetch(`/products/find-all?offset=${batchOffset}&limit=${batchSize}`)
      .then(response => {
        if (response.status === 200) return response.json()
        else throw new Error()
      }).then((res) => {
        const products = res.data
        if (products.length > 0) addNewBatch(products)
        if (products.length < batchSize) setIsLoading(false)
        batchOffset += batchSize
        //check if spinner is still on screen
        observer.observe(spinnerRef.current)
      }).catch(err => {
        setColor("error")
        setMessage("Un problème est survenu !")
      })
  }
  //Add the batch to the product list
  function addNewBatch(newProducts) {
    const newProductsCards = newProducts.map((p, i) => <ProductCard key={'prod' + p.id} product={p} />)
    productsSaved = [...productsSaved, ...newProductsCards]
    setProducts([...productsSaved])
  }
  return (
    <main className="productsPage">
      <h1 style={{ textAlign: 'center' }}>Nos produits</h1>
      {message ? <Alert severity={color}>{message}</Alert> : ""}
      <Categories categories={categories} chosenCategories={chosenCategories} setChosenCategories={setChosenCategories} />
      {categories.length === chosenCategories.length || chosenCategories.length === 0 ?
        <p>Tout nos produits :</p>
        :
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {chosenCategories.map((c, i) => ' ' + c.title) + ' :'}
          <Link onClick={(e) => { setChosenCategories([]) }}>Afficher les produits de toutes les catégories</Link>
        </div>
      }
      <div className="productCards">
        {products.filter(p => {
          if (chosenCategories.length === 1)
            return p.props.product.category_id === chosenCategories[0].id
          else
            return true
        })}
      </div>{/*observed spinner*/}
      {isLoading &&
        <div ref={spinnerRef} className="LoadingSpinner" >
          <SyncIcon />
        </div>
      }
    </main>
  );
}
export default Products
