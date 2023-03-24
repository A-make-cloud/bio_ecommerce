//import css from './css.css';
import addButton from '../Product';

function Product({ product }) {
  return (
    <div>
        <h4>{product.name}</h4>
        <p>{product.descriptif.slice(0, 40)+"..."}</p>
        <p>{product.price}</p>
    </div>
  );
}
export default Product;