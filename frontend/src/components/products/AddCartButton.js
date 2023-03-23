import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Tooltip from '@mui/material/Tooltip';
import {BasketContext} from '../../contexts/BasketContext'
import {useContext, useEffect} from 'react'

function AddCartButton({ productId, price }) {
    //const {basket, setBasket} = useContext(BasketContext)
    const {basket, addOne} = useContext(BasketContext);
    useEffect(()=>{

    },[])


    return (
        <div style={{}} className="addButton">
            {basket.total}
            <Tooltip title="Ajouter au panier" placement="right-end">
                <ControlPointIcon onClick={(e)=>addOne(productId, price)} />
            </Tooltip>
        </div>
    );
}
export default AddCartButton;
