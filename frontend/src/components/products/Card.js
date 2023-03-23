//import css from './css.css';
import AddCartButton from './AddCartButton';

function Card({ product }) {
  return (
    <div style={{width: "300px"}}>
        <h4>{product.name +' '+ product.id}</h4>
        <p>{product.description.slice(0, 40)+"..."}</p>
        <p>{product.price_ht}</p>
        <AddCartButton productId={product.id}/>
    </div>
  );
}
export default Card;