import Card from '../components/products/Card';
import { useState, useEffect } from 'react';
import fakeData from '../components/products/fakeData';

function Products() {
    const [loadedProducts, setLoadedProducts] = useState(fakeData);
    const [batchOffset, setBatchOffset] = useState(0);

    





    const fetchProductBatch=()=>{
        // fetch(`https://jsonplaceholder.typicode.com/posts`)
        //     .then(response => response.json())
        //     .then((products) => {
        //         setLoadedProducts(products);
        //     })

        }    
    
    return (
        <body>
            <h1>Products page</h1>
            <div >
                {console.log(loadedProducts)}
                {loadedProducts.map( (p, i)=>
                    <Card key={'prod'+i} product={p}/>
                )}
            </div>
            <div  style={{width:"30px", height:"30px", borderRadius:'15px', backgroundColor:'green'}}></div>
        </body>
    );
}

export default Products;