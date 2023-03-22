//import css from './css.css';
//import AddCardBtn from './AddCardBtn';

function Card({ product }) {
  return (
    <div style={{width: "300px"}}>
        <h4>{product.name +' '+ product.id}</h4>
        <p>{product.description.slice(0, 40)+"..."}</p>
        <p>{product.price}</p>
    </div>
  );
}
export default Card;