//import css from './css.css';
//import AddToCart from './AddToCart/';

function Product({ product }) {
  return (
    <div style={{width: "300px"}}>
        <h4>{product.name}</h4>
        <p>{product.description.slice(0, 40)+"..."}</p>
        <p>{product.price}</p>
    </div>
  );
}
export default Product;