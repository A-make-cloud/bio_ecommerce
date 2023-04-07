import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Tooltip from '@mui/material/Tooltip';
import { BasketContext } from '../../contexts/BasketContext'
import { useContext, useState } from 'react'
import ClickAwayListener from '@mui/material/ClickAwayListener';

function AddCartButton({ product }) {
    const { basket, addOne } = useContext(BasketContext);
    const [open, setOpen] = useState(false);
    const handleTooltipClose = () => {
        setOpen(false);
    };
    const handleTooltipOpen = () => {
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
        }, "2000");
    };

    return (
        <div className="addButton">
            {basket.total}
            <ClickAwayListener onClickAway={handleTooltipClose}>
                <Tooltip
                    PopperProps={{
                        disablePortal: true,
                    }}
                    onClose={handleTooltipClose}
                    open={open}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title={`"${product.title.slice(0, 10)}${product.title.slice(0, 10).length < product.title.length ? '...':''}" ajouté au panier`}
                    placement="right"
                >
                    <ControlPointIcon onClick={(e) => { handleTooltipOpen(); addOne(product) }} />
                </Tooltip>
            </ClickAwayListener>
        </div>
    );
}
export default AddCartButton;
