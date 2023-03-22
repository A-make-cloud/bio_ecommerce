import Card from '../components/products/Card';
import { useState, useRef, useEffect } from 'react';
import fakeData from '../components/products/fakeData';

function Products() {
    const batchSize = 5
    let batchOffset = 0
    let productsSaved = []
    //const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const spinnerRef = useRef();

    const observer = new IntersectionObserver(([elem]) => {
        if (elem.isIntersecting) { 
            //observer.unobserve(spinnerRef.current);
            console.log('elem.isIntersecting',elem.isIntersecting)
            const newBatch = fakeData.slice(batchOffset, batchOffset + batchSize)
            if(newBatch.length>0)
                addNewBatch(newBatch)
            batchOffset += batchSize  
        }
    })

    function addNewBatch(newProducts) {
        const newProductsCards = newProducts.map((p, i) => <Card key={'prod' + p.id} product={p} />)
        productsSaved=[...productsSaved, ...newProductsCards]
        console.log('new batch')
        setProducts(productsSaved)
    }

    useEffect(() => {
        if (spinnerRef.current) {
            observer.observe(spinnerRef.current);
        }
    }, []);
/*
    useEffect(() => {
        observer.observe(spinnerRef.current)
    });
*/

    const fetchProductBatch = () => {
        // fetch(`https://jsonplaceholder.typicode.com/posts`)
        //     .then(response => response.json())
        //     .then((products) => {
        //         setLoadedProducts(products);
        //     })
    }
    //utiliser un array de components directement plutot que le map : {loadedProducts.map( (p, i)=> <Card key={'prod'+i} product={p}/> )}
    return (
        <div>
            <h1>Nos produits</h1>
            <div >
                {console.log('return ', products)}
                {products}
            </div>
            <div ref={spinnerRef}>
                <div style={{ width: "30px", height: "30px", borderRadius: '15px', backgroundColor: 'green' }}></div>
            </div>
        </div>
    );
}

export default Products;


// ----------------------------------------
// exemple de code pour effectuer un lazy loading en utilisant l'Intersection Observer en React :

//import React, { useRef, useEffect, useState } from 'react';

/*function LazyComponent() {
  return <div>Lazy Component</div>;
}*/
/*
function App() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '0px 0px 100px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div>
      <h1>My App</h1>
      <div style={{ height: '1000px' }}>Scroll down to load lazy component</div>
      <div ref={ref}>
        {isVisible && <LazyComponent />}
      </div>
    </div>
  );
}

export default App;*/