import Categories from '../components/products/Categories';
import ProductCard from '../components/products/ProductCard';
import { useState, useRef, useEffect } from 'react';
import fakeData from '../components/products/fakeData';
import fakeCategories from '../components/products/fakeCategories';
import NavBar from '../components/layouts/Navbar.js'
import Footer from '../components/layouts/Footer.js'
import TopCategorie from '../components/layouts/TopCategorie.js';
import SyncIcon from '@mui/icons-material/Sync';

function Products() {
  const batchSize = 5
  let batchOffset = 0
  let productsSaved = []
  const categories = fakeCategories //todo: remplacer par un fetch
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [chosenCategories, setChosenCategories] = useState([...categories]);
  const spinnerRef = useRef();

  const observer = new IntersectionObserver(([elem]) => {
    if (elem.isIntersecting) {
      const newBatch = fakeData.slice(batchOffset, batchOffset + batchSize)
      // pour la bdd, remplacer par
      //(async()=>{const newBatch =  await fetchProductBatch(filter, batchOffset, batchSize)})()
      if (newBatch.length > 0)
        addNewBatch(newBatch)
      if (newBatch.length < batchSize)
        setIsLoading(false)
      batchOffset += batchSize
    }
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
    //setChosenCategories([...categories])
  }, []);

  useEffect(() => {
    //fetchProductBatch avec filtre avec chosenCategories.map(c=>c.id)
    batchOffset = 0
    productsSaved=[]
    setProducts([])
  }, [chosenCategories]);

  //todo: mettre un fetch pour récup les données de la bdd au lieu du fake
  //const fetchProductBatch = (filter, batchOffset, batchSize) => {
  // return fetch(`https://jsonplaceholder.typicode.com/posts`)
  //     .then(response => response.json())
  //     .then((products) => {
  //         return products;
  //     })
  //}

  return (
    <>
      <NavBar />
      <main className="productsPage">
        <h1 style={{ textAlign: 'center' }}>Nos produits</h1>
        {/*<TopCategorie sx={{height: 5 }}/>*/}
        <Categories categories={categories} chosenCategories={chosenCategories} setChosenCategories={setChosenCategories} />

        {categories.length === chosenCategories.length || chosenCategories.length === 0 ?
          <p>Tout nos produits :</p>
          : chosenCategories.map((c, i) => ' '+c.title) + ' :'}

        <div className="productCards">
          {products}
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
