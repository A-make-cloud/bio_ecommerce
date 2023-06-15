import { useFormik } from 'formik';
import * as yup from 'yup';
import valid from "card-validator";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Alert, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Checkbox } from '@mui/material';
//import RegisterSchema from '../validations/RegisterSchema';
import { BasketContext } from '../../contexts/BasketContext'
import { AuthContext } from '../../contexts/AuthContext'
import SyncIcon from '@mui/icons-material/Sync';

function PaymentForm() {
    const { basket, getItemsWithDetails, getTotalTva, getTotalTtc, emptyBasket } = useContext(BasketContext);
    const { user, isLogged, setIsLogged } = useContext(AuthContext);
    const navigate = useNavigate();

    const [color, setColor] = useState('')
    const [message, setMessage] = useState('')
    const [processing, setProcessing] = useState(false)

    const validationSchema = yup.object(
        {
            name: yup.string()
                .required("Nom est obligatoire.")
                .min(2, "Le nom doit contenir au moins 2 caractères.")
            ,
            number: yup.string()
                .test('test-number', 
                    'Le numéro de carte est invalide', 
                    value => valid.number(value).isValid) 
                .required("Le numéro de carte est obligatoire")
            ,
            expiration: yup.string()
                .test('test-number', 
                    "La date d'expiration est invalide", 
                    value => valid.expirationDate(value).isValid) 
                .required("La date d'expiration est obligatoire"),

            crypto: yup.string()
                .test('test-number', 
                    "Le cryptogramme est invalide", 
                    value => valid.cvv(value).isValid) 
                .required("Le cryptogramme est obligatoire"),

            code: yup
                .string()
                .max(4, "Le code doit faire 4 charactères")
                .min(4, "Le code doit faire 4 charactères")
                .required("Le code de la carte est obligatoire"),
        }
    );

    const formik = useFormik({
        initialValues: {
            type: 'visa',
            name: user.firstname+' '+user.lastname,
            number: '5017674000000002',
            expiration: '01/25',
            crypto: '123',
            code: '1234',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            //succès de la vérif du formulaire, donc affichage du message de "processing"
            setProcessing(true)
            setColor("info")
            setMessage('Veuillez patienter, nous contactons votre bank, qui va vous demander de confirmer votre opération.')
            //récupérer le panier pour l'envoyer avec les données du formulaire pour vérifier de nouveau le stock et créer la commande
            //il ne faut que les données nécessaire à la bdd, table commandeLine: product_id, price_ht, tva, quantity :
            const lines  = getItemsWithDetails().map(product=>{return {
                product_id:product.id, price_ht:product.totalPrice_ht, tva:product.tva, quantity:product.pickedQuantity
            }})
            values.lines=lines
            //récupérer le prix même qui fut affiché à l'utilisateur:
            const amount = Math.floor(getTotalTtc()*100)/100
            values.amount=amount
            console.log(values)
            
            fetch('/commandes/place-order', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values, null, 2),
                credentials: 'include'
            })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status !== 500){
                    setColor("error")
                    response.json().then(result=>{
                        setMessage(result?.error??result?.message)
                    })
                }else{
                    throw new Error()
                }
            })
            .then(result => {
                //Le processus d'achat se termine ici
                setColor("success")
                setMessage(result.message)
                emptyBasket()
                navigate('/payment-confirm') 
            })
            .catch(err => {
                console.log('y 1 erreur : ', err)
                setColor("error")
                setMessage('Une erreur est survenue ! ')
            })
        },
    });

    return (

        <main style={{maxWidth:'600px', marginLeft:'auto', marginRight:'auto'}} >
            <h1>Fromulaire de payement </h1>
            {message ? <Alert severity={color}>{message}{processing && <div className="LoadingSpinner"><SyncIcon /></div>}</Alert> : ""}
            <form onSubmit={formik.handleSubmit} className="loginForm">
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Type de carte</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="type"
                        value={formik.values.type}
                        onChange={formik.handleChange}
                    >
                        <FormControlLabel value="visa" control={<Radio />} label="VISA" disabled={processing} />
                        <FormControlLabel value="mastercard" control={<Radio />} label="Master card" disabled={processing} />
                        <FormControlLabel value="cb" control={<Radio />} label="CB" disabled={processing} />
                    </RadioGroup>
                </FormControl>
                <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Titulaire de la carte"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    spacing={5}
                    disabled={processing}
                />
                <TextField
                    fullWidth
                    id="number"
                    name="number"
                    label="Numéro de votre carte"
                    value={formik.values.number}
                    onChange={formik.handleChange}
                    error={formik.touched.number && Boolean(formik.errors.number)}
                    helperText={formik.touched.number && formik.errors.number}
                    spacing={5}
                    disabled={processing}
                />
                <TextField
                    fullWidth
                    id="expiration"
                    name="expiration"
                    label="Date d'expiration"
                    value={formik.values.expiration}
                    onChange={formik.handleChange}
                    error={formik.touched.expiration && Boolean(formik.errors.expiration)}
                    helperText={formik.touched.expiration && formik.errors.expiration}
                    disabled={processing}
                    spacing={5}
                />
                <TextField
                    fullWidth
                    id="crypto"
                    name="crypto"
                    label="crypto"
                    type="Cryptogramme"
                    value={formik.values.crypto}
                    onChange={formik.handleChange}
                    error={formik.touched.crypto && Boolean(formik.errors.crypto)}
                    helperText={formik.touched.crypto && formik.errors.crypto}
                    disabled={processing}
                />
                <TextField
                    fullWidth
                    id="code"
                    label="Entrez votre code"
                    type="code"
                    value={formik.values.code}
                    onChange={formik.handleChange}
                    error={formik.touched.code && Boolean(formik.errors.code)}
                    helperText={formik.touched.code && formik.errors.code}
                    disabled={processing}
                />

                {/*<Checkbox required /> J'accèpte les <Link to="/conditions">conditions générales de vente</Link>*/}

                <Button color="primary" variant="contained" fullWidth type="submit" disabled={processing}>
                    Payer
                </Button>

            </form>
        </main>
    );
}

export default PaymentForm;
