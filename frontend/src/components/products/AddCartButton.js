import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Tooltip from '@mui/material/Tooltip';
import {BasketContext} from '../../contexts/BasketContext'
import {useContext, useEffect} from 'react'

function AddCartButton({ productId }) {
    //const {basket, setBasket} = useContext(BasketContext)
    const {basket, addOne} = useContext(BasketContext);


    return (
        <div style={{}} className="addButton">
            {basket.total}
            <Tooltip title="Ajouter au panier" placement="right-end">
                <ControlPointIcon onClick={(e)=>addOne(productId)} />
            </Tooltip>
        </div>
    );
}
export default AddCartButton;
