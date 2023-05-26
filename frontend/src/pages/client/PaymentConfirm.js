import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

function PaymentForm() {
    return (
        <main style={{maxWidth:'600px', marginLeft:'auto', marginRight:'auto'}} >
            <h2>Merci pour votre achat</h2>
            <Button
                component={Link}
                to={`/products`}
                variant="contained"
                color="primary"
                sx={{ margin:'auto' }}
            >
                Continuer à parcourir les produits
            </Button> 
            <Button
                component={Link}
                to={`/client/commandes`}
                variant="contained"
                color="primary"
                sx={{ margin:'20px' }}
            >
                Voir vos commandes
            </Button> 
        </main>
    );
}
export default PaymentForm;
    