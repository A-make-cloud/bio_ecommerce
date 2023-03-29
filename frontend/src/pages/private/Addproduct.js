import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Alert } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function AddProduct() {
    const navigate = useNavigate();

    const [color, setColor] = useState()
    const [message, setMessage] = useState()
    const validationSchema = yup.object({
        title: yup
            .string('Entrez le titre du produit')
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        category_id: yup
            .number('Entrez un numéro de catégorie'),
        description: yup
            .string('Entrez une description')
            .min(2, 'Too Short!')
            .max(200, 'Limite 200 charactères')
            .required('Required'),
        price_HT: yup
            .number('Entrez un prix en euro')
            .positive('Pas de négatif')
            .max(10000, 'Trop gros !'),
        tva: yup
            .number('Entrez un pourcentage')
            .positive('Pas de négatif')
            .max(100, 'Trop gros!'),
        quantity: yup
            .number('Entrez un nombre')
            .positive(0, 'Pas de négatif')
            .max(1000000, 'Trop gros!'),
        status: yup
            .number('Entrez un nombre')
            .min(1, 'Required')
            .max(2, 'trop'),
        top: yup
            .number("Entrez un nombre d'importance")
            .min(0, 'Pas de négatif')
            .max(1000000000, 'Trop gros!')
            .required('Required'),
    });

    const formik = useFormik({
        initialValues: {
            title: 'titre',
            category_id: 1,
            description: 'blabla',
            price_HT: 2,
            tva: 5.5,
            quantity: 1,
            status: 1,
            top: 10,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            //alert(JSON.stringify(values, null, 2));
            console.log(values)
            
            fetch('/products/create', {
                method: 'POST',
                headers: {
                    "content-Type":"application/json"
                },
                body: JSON.stringify(values),
                credentials: 'include',

            })
                .then(response => {
                    // Affiche le statut de la réponse (par exemple, 200 pour OK)
                    //console.log(response.status, response)
                    if (response.status !== 200) {
                        // alert("error")
                        setColor("error")
                    } else {
                        // alert("OK")
                        setColor("success")


                    }
                    return response.json();
                })
                .then(result => {
                    console.log(result)
                    setMessage(result.message)

                })
                .catch(err => {
                    console.log('y 1 erreur : ', err)
                    if (err.message === 'Failed to fetch')
                        alert('Une erreur est survenue sur le réseau !')
                    //alert('Une erreur est survenue ! ', err);
                })

        },
    });

    return (
        <main className="marginPage">
            <h1>Ajouter un produit</h1>
            {message ? <Alert severity={color}>{message}</Alert> : ""}
            <form onSubmit={formik.handleSubmit} className="addProdForm">
                <TextField
                    fullWidth
                    id="title"
                    name="title"
                    label="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                    
                />
                <InputLabel id="category_id">Catégorie</InputLabel>
                <Select
                    fullWidth
                    labelId="category_id"
                    id="category_id"
                    name="category_id"
                    value={formik.values.category_id}
                    label="category_id"
                    onChange={formik.handleChange}
                >
                    <MenuItem value={1}>1 - cat1</MenuItem>
                    <MenuItem value={2}>2 - cat2</MenuItem>
                    <MenuItem value={3}>3 - cat3</MenuItem>
                    <MenuItem value={3}>4 - cat4</MenuItem>
                </Select>

                <TextField
                    fullWidth
                    id="description"
                    name="description"
                    label="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                    spacing={5}
                />
                <TextField
                    fullWidth
                    id="price_HT"
                    name="price_HT"
                    label="price_HT"
                    value={formik.values.price_HT}
                    onChange={formik.handleChange}
                    error={formik.touched.price_HT && Boolean(formik.errors.price_HT)}
                    helperText={formik.touched.price_HT && formik.errors.price_HT}
                    spacing={5}
                />
                <TextField
                    fullWidth
                    id="tva"
                    name="tva"
                    label="tva"
                    value={formik.values.tva}
                    onChange={formik.handleChange}
                    error={formik.touched.tva && Boolean(formik.errors.tva)}
                    helperText={formik.touched.tva && formik.errors.tva}
                    spacing={5}
                />
                <TextField
                    fullWidth
                    id="quantity"
                    name="quantity"
                    label="quantity"
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                    error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                    helperText={formik.touched.quantity && formik.errors.quantity}
                    spacing={5}
                />
                <InputLabel id="status">Status</InputLabel>
                <Select
                    fullWidth
                    spacing={5}
                    labelId="status"
                    id="status"
                    value={formik.values.status}
                    label="status"
                    onChange={formik.handleChange}
                    name="status"
                >
                    <MenuItem value={1}>1 - En ligne</MenuItem>
                    <MenuItem value={2}>2 - Hors ligne</MenuItem>
                </Select>
                <TextField
                    fullWidth
                    spacing={5}
                    id="top"
                    name="top"
                    label="top"
                    type="top"
                    value={formik.values.top}
                    onChange={formik.handleChange}
                    error={formik.touched.top && Boolean(formik.errors.top)}
                    helperText={formik.touched.top && formik.errors.top}
                />
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Créer le produit
                </Button>
            </form>


        </main>

    );
}


export default AddProduct;