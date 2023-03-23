import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Tooltip from '@mui/material/Tooltip';
function AddCartButton({ productId }) {
  return (
    <div style={{}} className="addButton">
        <Tooltip title="Ajouter au panier" placement="right-end">

            <ControlPointIcon/>

        </Tooltip>
    </div>
  );
}
export default AddCartButton;
