import Categories from '../components/products/Categories';
import ProductCard from '../components/products/ProductCard';
import { useState, useRef, useEffect } from 'react';
//import fakeData from '../components/products/fakeData';
//import fakeCategories from '../components/products/fakeCategories';
import NavBar from '../components/layouts/Navbar.js'
import Footer from '../components/layouts/Footer.js'
import SyncIcon from '@mui/icons-material/Sync';
import { Link } from "react-router-dom";

function Products() {
  const batchSize = 10
  let batchOffset = 0
  let productsSaved = []
  //const categories = fakeCategories //todo: remplacer par un fetch
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [chosenCategories, setChosenCategories] = useState(categories.map(c=>c.id));
  const spinnerRef = useRef();

  const observer = new IntersectionObserver(([elem]) => {
    if (elem.isIntersecting) {
      fetch(`/products/findAll?offset=${batchOffset}&limit=${batchSize}`)
        .then(response => response.json())
        .then((res) => {
          const products = res.data
          if (products.length > 0)
            addNewBatch(products)
          if (products.length < batchSize)
            setIsLoading(false)
          batchOffset += batchSize
        })
    }
    //observer.observe(elem.target);
  })

  function addNewBatch(newProducts) {
    const newProductsCards = newProducts.map((p, i) => <ProductCard key={'prod' + p.id} product={p} />)
    productsSaved = [...productsSaved, ...newProductsCards]
    setProducts([...productsSaved])
  }

  useEffect(() => {
    if (spinnerRef.current) {
      observer.observe(spinnerRef.current);
    }
    //RECUPERATION des catégories dans BDD
    async function fetchCat(){
      const response = await fetch('/categories/findAll')
      if (response.status !== 500){
        const json = await response.json()
        setCategories(json)
      }else{
        console.log('pas de catégories')
      }
    }
    fetchCat()
  }, []);

  useEffect(() => {
    setProducts([...products])
  }, [chosenCategories]);

  useEffect(() => {
    //observer.observe(spinnerRef.current);
    console.log(products.length)
  });


  return (
    <>
      <NavBar />
      <main className="productsPage">
        <h1 style={{ textAlign: 'center' }}>Nos produits</h1>
        <Categories categories={categories} chosenCategories={chosenCategories} setChosenCategories={setChosenCategories} />

        {categories.length === chosenCategories.length || chosenCategories.length === 0 ?
        
          <p>Tout nos produits :</p>
          :
          <div style={{display:'flex', justifyContent:'space-between'}}>
            {chosenCategories.map((c, i) => ' ' + c.title) + ' :'}
            <Link onClick={(e)=>{setChosenCategories([])}}>Afficher les produits de toutes les catégories</Link>
          </div>
        }
        <div className="productCards">
          {products.filter(p=>{
            if(chosenCategories.length===1)
              return p.props.product.category_id===chosenCategories[0].id
            else
              return true
            })}

        </div>
        {isLoading &&
          <div ref={spinnerRef} className="LoadingSpinner" >
            <SyncIcon />
          </div>
        }
      </main>
      <Footer />
    </>
  );
}

export default Products;
