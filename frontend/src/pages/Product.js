//import css from './css.css';
//import addButton from '../Product';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function Product() {
  const params = useParams()
  const [product, setProduct] = useState()
  const prodId = params.id;
  // const product = { name: 'toto', description: 'titi', price_ht: 'tutu' } //fetcher le produit avec un await...




  useEffect(function effectFunction() {
    async function fetchProduct() {
      const response = await fetch(`/products/find/${prodId}`);
      console.log(response.status)
      //if status 201 ==>OK 
      if (response.status === 201) {
        const json = await response.json();
        console.log(json)
        setProduct(json.data)
      } else {
        alert("not product")
      }

    }
    fetchProduct();
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Page product </h1>
      <h4>{product ? product.title : "title"}</h4>
      <p>{product ? product.description.slice(0, 40) + "..." : "description"}</p>
      <p>{product ? product.price_ht : ""}</p>
    </div>
  );
}
export default Product;