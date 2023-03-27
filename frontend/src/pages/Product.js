//import css from './css.css';
//import addButton from '../Product';
import { useParams } from "react-router-dom";

function Product() {
  const params = useParams()
  const prodId = params.id;
  const product ={name:'toto', description:'titi', price_ht:'tutu'} //fetcher le produit avec un await...

  return (
    <div>
        <h4>{product.name}</h4>
        <p>{product.description.slice(0, 40)+"..."}</p>
        <p>{product.price_ht}</p>
    </div>
  );
}
export default Product;