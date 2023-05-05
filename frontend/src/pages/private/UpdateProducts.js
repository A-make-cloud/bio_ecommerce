import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Alert, Grid, Paper, InputLabel, MenuItem, Select } from '@mui/material';
import NavbarAdmin from './NavbarAdmin';

function UpdateProduct() {
    const params = useParams()
    const id = params.id;
    const [product, setProduct] = useState({});
    const [color, setColor] = useState('info')
    const [message, setMessage] = useState('Chargement en cours...')

    useEffect(() => {
        fetch("/products/find/"+id)
        .then((res) => { 
            if(res.status === 204){
                setColor("error")
                setMessage(`Le produit #${id} n'a pas été trouvé !`)
                throw new Error()
            }else if(res.status !== 200) {
                setColor("error")
                setMessage("Une erreur est survenue")
                throw new Error()
            }
            return res.json()
        })
        .then((result) => {
            setColor("")
            setMessage("")
            setProduct(result.data)
        })
        .catch((err) => { })
    }, []);

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
        price_ht: yup
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
            title: product?.title ?? '',
            category_id: product?.category_id ?? '',
            description: product?.description ?? '',
            price_ht: product?.price_ht ?? '',
            tva: product?.tva ?? '',
            quantity: product?.quantity ?? '',
            status: product?.status ?? '',
            top: product?.top ?? '',
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            fetch(`/products/update/${id}`, {
                method: 'PUT',
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify(values, null, 2),
                credentials: 'include'
            })
                .then(response => {
                    if (response.status === 200) {
                        setColor("success")
                        setMessage(`Votre produit #${id} a bien été mise à jour.`)
                    }
                    else {
                        setColor("error")
                        setMessage('Une erreur est survenue lors de la modification de votre produit !')
                    }
                })
                .catch(err => { 
                    setColor("error")
                    setMessage('Une erreur est survenue sur le réseau !')
                })
        },
    });

    return (
        <div className="adminBody">
            <NavbarAdmin />
            <main className="marginPage">
                <Paper
                    sx={{
                        p: 2,
                        margin: 'auto',
                        maxWidth: 700,
                        flexGrow: 1,
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                    }}
                >
                    <h1>Modifier un produit</h1>
                    {message ? <Alert severity={color}>{message}</Alert> : ""}
                    {Object.keys(product).length !== 0 &&

                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <form onSubmit={formik.handleSubmit} className="addProdForm">
                                <TextField
                                    fullWidth
                                    id="title"
                                    name="title"
                                    label="Titre du produit"
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
                                    <MenuItem value={4}>4 - cat4</MenuItem>
                                </Select>
                                <TextField
                                    fullWidth
                                    id="description"
                                    name="description"
                                    label="Description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    error={formik.touched.description && Boolean(formik.errors.description)}
                                    helperText={formik.touched.description && formik.errors.description}
                                    spacing={5}
                                />
                                <TextField
                                    fullWidth
                                    id="price_ht"
                                    name="price_ht"
                                    label="Prix HT"
                                    value={formik.values.price_ht}
                                    onChange={formik.handleChange}
                                    error={formik.touched.price_ht && Boolean(formik.errors.price_ht)}
                                    helperText={formik.touched.price_ht && formik.errors.price_ht}
                                    spacing={5}
                                />
                                <TextField
                                    fullWidth
                                    id="tva"
                                    name="tva"
                                    label="TVA"
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
                                    label="Quantité"
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
                                    label="Status"
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
                                    label="Top"
                                    type="top"
                                    value={formik.values.top}
                                    onChange={formik.handleChange}
                                    error={formik.touched.top && Boolean(formik.errors.top)}
                                    helperText={formik.touched.top && formik.errors.top}
                                />
                                <Button color="primary" variant="contained" fullWidth type="submit">
                                    Mettre à jour le produit
                                </Button>
                            </form>
                        </Grid>
                    </Grid>
                    }
                </Paper>
            </main>
        </div>
    )
}

export default UpdateProduct
