import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { TextField, Button, Alert, Grid, Paper, Select, MenuItem, InputLabel } from '@mui/material';
import NavbarAdmin from './NavbarAdmin';

function Addproduct() {
    const navigate = useNavigate();
    const [color, setColor] = useState()
    const [message, setMessage] = useState()
    const [selectedImage, setSelectedImage] = useState(null);

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
        image_title: yup
            .string('Entrez le titre de l\'image')
            .max(50, '50 charactères maxi pour le titre de l\'image')
    });

    const formik = useFormik({
        initialValues: {
            title: 'titre',
            category_id: 1,
            description: 'blabla',
            price_ht: 2,
            tva: 5.5,
            quantity: 1,
            status: 1,
            top: 10,
            image_file: null,
            image_title: '',
            image_type: 'max'

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const formData = new FormData();
            for (const [key, value] of Object.entries(values)) {
                formData.append(key, value);
            }
            fetch('/products/create', {
                method: 'POST',
                /*headers: {
                    "content-Type": "application/json"
                },*/
                body: formData,//JSON.stringify(values),
                credentials: 'include',
            })
            .then(response => {
                if (response.status === 201) {
                    return response.json();
                } else {
                    //throw new Error()
                    setColor("error")
                    response.json().then(result=>{
                        console.log(result.error)
                        setMessage(result?.message??result?.error)
                    })
                }
            })
            .then(result => {
                setColor("success")
                setMessage(result.message)
            })
            .catch(err => {
                console.log('y 1 erreur : ', err)
                if (err.message === 'Failed to fetch'){
                    setColor("error")
                    setMessage('Une erreur est survenue, vérifiez votre connexion.')
                }else{
                    setColor("error")
                    setMessage(err?.message??err?.error)
                }
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
                    <h1>Ajouter un produit</h1>
                    {message ? <Alert severity={color}>{message}</Alert> : ""}
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <form onSubmit={formik.handleSubmit} className="addProdForm" encType="multipart/form-data">
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
                                    label="déscription"
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
                                    label="prix ht"
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
                                    label="quantité"
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
                                <InputLabel id="imageFile">image principale</InputLabel>
                                <TextField
                                    id="imageFile"
                                    type="file"
                                    onChange={e => {
                                        const file = e.target.files[0];
                                        if(file)
                                            setSelectedImage(URL.createObjectURL(file));
                                        else
                                            setSelectedImage(null)
                                        formik.setFieldValue('image_file', file)}
                                    }
                                />
                                {formik.values.image_file &&
                                    <>
                                    <img
                                        src={selectedImage}
                                        alt="Aperçu"
                                        style={{ width: 80}}
                                    />
                                    {/*<InputLabel id="image_type">type d'image</InputLabel>
                                    <Select
                                        fullWidth
                                        spacing={5}
                                        labelId="image_type"
                                        id="image_type"
                                        value={formik.values.image_type}
                                        label="image_type"
                                        onChange={formik.handleChange}
                                        name="image_type"
                                    >
                                        <MenuItem value={'max'}>"max" - image de taille maximal</MenuItem>
                                        <MenuItem value={'min'}>"min" - image miniature</MenuItem>
                                </Select>*/}
                                    <TextField
                                        fullWidth
                                        spacing={5}
                                        id="image_title"
                                        name="image_title"
                                        label="titre de l'image"
                                        type="image_title"
                                        value={formik.values.image_title}
                                        onChange={formik.handleChange}
                                        error={formik.touched.image_title && Boolean(formik.errors.image_title)}
                                        helperText={formik.touched.image_title && formik.errors.image_title}
                                    />
                                    </>
                                }
                                <Button color="primary" variant="contained" fullWidth type="submit">
                                    Créer le produit
                                </Button>
                            </form>
                        </Grid>
                    </Grid>
                </Paper>
            </main>
        </div>
    );
}
export default Addproduct;
