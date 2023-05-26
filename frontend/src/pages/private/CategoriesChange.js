import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Alert, Grid, Paper, InputLabel, MenuItem, Select } from '@mui/material';
import NavbarAdmin from './NavbarAdmin';

function CategoriesChange({method}) {
    const params = useParams()
    const id = params?.id;
    const [category, setCategory] = useState({});
    const [color, setColor] = useState('info')
    const [message, setMessage] = useState('Chargement en cours...')

    useEffect(() => {
        if(method==='put'){
            fetch("/categories/find/"+id)
            .then((res) => { 
                if(res.status === 200){
                    return res.json()
                } else if(res.status === 204){
                    setColor("error")
                    setMessage(`La catégorie #${id} n'a pas été trouvé !`)
                } else if(res.status === 500){
                    setColor("error")
                    setMessage(`Une erreur est survenue !`)
                } else {
                    throw new Error()
                }
            })
            .then((result) => {
                setColor("")
                setMessage("")
                setCategory(result.data)
            })
            .catch((err) => {
                setColor("error")
                setMessage("Une erreur est survenue sur le réseau !")
            })
        }else{
            setColor("")
            setMessage("")
        }
    }, []);

    const validationSchema = yup.object({
        title: yup
            .string('Entrez le titre de la catégorie')
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        description: yup
            .string('Entrez une description')
            .min(2, 'Too Short!')
            .max(200, 'Limite 200 charactères')
            .required('Required'),
        img: yup
            .string('Entrez une url')
            .min(2, 'Too Short!')
            .max(200, 'Limite 200 charactères')
            .required('Required'),
        background: yup
            .string('Entrez une valeur en hexadecimal')
            .max(12, 'Trop gros!'),
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
            title: category?.title ?? '',
            description: category?.description ?? '',
            img: category?.img ?? '',
            background: category?.background ?? '',
            status: category?.status ?? '',
            top: category?.top ?? '',
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if(method==='put'){
                fetch(`/categories/update/${id}`, {
                    method: 'PUT',
                    headers: {
                        "content-Type": "application/json"
                    },
                    body: JSON.stringify(values, null, 2), credentials: 'include'
                })
                .then(response => {
                    if (response.status === 200) {
                        setColor("success")
                        setMessage(`La catégorie #${id} a bien été mise à jour.`)
                    }
                    else {
                        setColor("error")
                        setMessage('Une erreur est survenue lors de la modification de la catégorie !')
                    }
                })
                .catch(err => { 
                    setColor("error")
                    setMessage('Une erreur est survenue sur le réseau !')
                })
            }else{
                fetch(`/categories/create`, {
                    method: 'POST',
                    headers: {
                        "content-Type": "application/json"
                    },
                    body: JSON.stringify(values, null, 2), credentials: 'include'
                })
                .then(response => {
                    if (response.status === 201) {
                        return response.json()
                    } else if(response.status === 500){
                        setColor("error")
                        setMessage('Une erreur est survenue lors de la création de la catégorie !')
                    }else{
                        throw new Error()
                    }
                })
                .then(result => {
                    setCategory([])
                    setColor("success")
                    setMessage(`La catégorie "${result.data.title}" a été créée.`)
                })
                .catch(err => { 
                    console.log(err)
                    setColor("error")
                    setMessage('Une erreur est survenue sur le réseau !')
                })
            }
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
                    { method==='put' ? <h1>Modifier une catégorie</h1> : <h1>Ajouter une catégorie</h1> }
                    {message ? <Alert severity={color}>{message}</Alert> : ""}
                    <h3>Apperçu du rendu : </h3>
                    <div style={{ backgroundColor:formik.values.background, marginBottom:'20px'}} className='categoryCartouche'>
                        <h3>{formik.values.title}</h3>
                        <div style={{width:'61px', height:'61px', backgroundImage: `url(${formik.values.img})`, backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center', backgroundSize: 'cover'}}>
                        </div>
                    </div>

                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <form onSubmit={formik.handleSubmit} className="addProdForm">
                                <TextField
                                    fullWidth
                                    id="title"
                                    name="title"
                                    label="Titre de la catégorie"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    error={formik.touched.title && Boolean(formik.errors.title)}
                                    helperText={formik.touched.title && formik.errors.title}
                                />
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
                                    id="img"
                                    name="img"
                                    label="Image"
                                    value={formik.values.img}
                                    onChange={formik.handleChange}
                                    error={formik.touched.img && Boolean(formik.errors.img)}
                                    helperText={formik.touched.img && formik.errors.img}
                                    spacing={5}
                                />
                                <TextField
                                    fullWidth
                                    id="background"
                                    name="background"
                                    label="Couleur de font"
                                    value={formik.values.background}
                                    onChange={formik.handleChange}
                                    error={formik.touched.background && Boolean(formik.errors.background)}
                                    helperText={formik.touched.background && formik.errors.background}
                                    spacing={5}
                                />
                                <InputLabel id="status">Status</InputLabel>
                                <Select
                                    fullWidth
                                    spacing={5}
                                    labelId="status"
                                    id="status"
                                    value={formik.values.status}
                                    label="Statu"
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
                                    { method==='put' ? 'Modifier' : 'Créer' }
                                </Button>
                            </form>
                        </Grid>
                    </Grid>
                </Paper>
            </main>
        </div>
    )
}

export default CategoriesChange
