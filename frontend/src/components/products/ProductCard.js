import AddCartButton from './AddCartButton';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Link } from "react-router-dom";
//import Button from '@mui/material/Button'


function ProductCard({ product }) {
  const priceTTC= Math.round( (product.price_ht * (1 + product.tva / 100))*100 )/100
  const maxImage= product.Images.find(i=>i.type==='max')
  return (
    <Card className='productCard'>
      <Link to={`/product/${product.id}`} style={{ color: "inherit", textDecoration: "none" }}>
        <CardMedia
          sx={{ height: 160 }}
          image={maxImage?.url??"https://res.cloudinary.com/dxqhz3pif/image/upload/v1685885905/bioshop-product-images/23.png"}
          title={maxImage?.title??"default image"}
        />
      </Link>
      <CardContent>
        <h4>{product.title + ' '}</h4>
        <p>{product.description.slice(0, 50) + "..."}</p>
      </CardContent>
      <CardActions className="priceAndAdd">
        <p>{`${priceTTC} €`}</p>
        <AddCartButton product={product} />
      </CardActions>
    </Card>
  );
}
export default ProductCard;
