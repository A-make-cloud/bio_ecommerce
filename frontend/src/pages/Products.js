import ProductCard from '../components/products/ProductCard';
import { useState, useRef, useEffect } from 'react';
import fakeData from '../components/products/fakeData';
import NavBar from '../components/layouts/Navbar.js'
import Footer from '../components/layouts/Footer.js'
import TopCategorie from '../components/layouts/TopCategorie.js';
import SyncIcon from '@mui/icons-material/Sync';

function Products() {
  const batchSize = 5
  let batchOffset = 0
  let productsSaved = []
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const spinnerRef = useRef();
  //const loadMoreRef = useRef();

  const observer = new IntersectionObserver(([elem]) => {
    if (elem.isIntersecting) {
      //observer.unobserve(spinnerRef.current);
      console.log('elem.isIntersecting', elem.isIntersecting)
      const newBatch = fakeData.slice(batchOffset, batchOffset + batchSize)
      if (newBatch.length > 0)
        addNewBatch(newBatch)
      if (newBatch.length < batchSize)
        setIsLoading(false)
      batchOffset += batchSize
    }
  })

  /*    const loadMoreObserver = new IntersectionObserver(([elem]) => {
        if (elem.isIntersecting) { 
            console.log('elem.isIntersecting',elem.isIntersecting)
            const newBatch = fakeData.slice(batchOffset, batchOffset + batchSize)
            if(newBatch.length>0)
                addNewBatch(newBatch)
            batchOffset += batchSize  
        }
    })*/

  function addNewBatch(newProducts) {
    const newProductsCards = newProducts.map((p, i) => <ProductCard key={'prod' + p.id} product={p} />)
    productsSaved = [...productsSaved, ...newProductsCards]
    console.log('new batch')
    setProducts([...productsSaved])
  }

  useEffect(() => {
    if (spinnerRef.current) {

      observer.observe(spinnerRef.current);
    }
    /*if (loadMoreRef.current){
      loadMoreObserver.observe(loadMoreRef.current)
    }*/
  }, []);

  //const fetchProductBatch = () => {
  // fetch(`https://jsonplaceholder.typicode.com/posts`)
  //     .then(response => response.json())
  //     .then((products) => {
  //         setLoadedProducts(products);
  //     })
  //}

  return (
    <>
      <NavBar />
      <body className="productsPage">
        <h1 style={{ textAlign: 'center' }}>Nos produits</h1>
        {/*<TopCategorie sx={{height: 5 }}/>*/}
        <div className="productCards">
          {console.log('return ', products)}
          {products}
        </div>
        {isLoading &&
          <div ref={spinnerRef} className="LoadingSpinner" >
            <SyncIcon />
          </div>
        }
        {/*<div ref={loadMoreRef}>
                  <div style={{ width: "30px", height: "30px", borderRadius: '15px', backgroundColor: 'red' }}></div>
        </div>*/}
      </body>
      <Footer />
    </>
  );
}

export default Products;
