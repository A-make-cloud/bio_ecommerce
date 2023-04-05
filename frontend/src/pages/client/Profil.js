import { useContext, useEffect, useState } from 'react';
import NavbarClient from './NavbarClient';



import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import { Alert, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup } from '@mui/material';

export default function Profil() {

    const navigate = useNavigate();


    const [user, setUser] = useState();
    const localUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

    const accessToken = localUser.accessToken


    useEffect(() => {

        async function getUserDb() {
            //recuperer les info de la base de donnée 
            await fetch(`/users/find/${localUser.id}`)
                .then(response => response.json())
                .then((res) => {
                    setUser(res.data)
                })
        }
        getUserDb()

    }, []);






    const [color, setColor] = useState()
    const [message, setMessage] = useState()
    const validationSchema = yup.object(
        {
            firstname: yup.string()
                .required("Nom est obligatoire.")
                .min(2, "Le nom doit contenir au moins 2 caractères.")
            ,
            lastname: yup.string()
                .required("Le prénom est obligatoire")
                .min(2, "Le prénom doit contenir au moins 2 caractères.")
            ,
            email: yup
                .string()
                .email("Veuillez saisir une adresse email valide.")
                .required("Email est obligatoire."),




        }
    );

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            civility: user?.civility,
            firstname: user?.firstname,
            lastname: user?.lastname,
            email: user?.email,



        },
        validationSchema: validationSchema,
        onSubmit: (values) => {

            //alert(JSON.stringify(values, null, 2));

            fetch('/users/update', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values, null, 2),
                credentials: 'include'
            })
                .then(response => {
                    // Affiche le statut de la réponse (par exemple, 200 pour OK)

                    if (response.status !== 200) {
                        // alert("error")
                        setColor("error")
                    } else {
                        // alert("OK")
                        setColor("success")

                        // navigate('/dashbord')
                    }
                    return response.json();
                })
                .then(result => {
                    setMessage(result.message)
                    //redirection si succès pour se connecter :

                })
                .catch(err => {
                    console.log('y 1 erreur : ', err)
                    if (err.message === 'Failed to fetch')
                        alert('Une erreur est survenue sur le réseau !')
                    //alert('Une erreur est survenue ! ', err);
                })


        },
    });


    if (user) {

        return (



            <main className="productsPage">
                <NavbarClient />


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
                    <h1>Mon profil  {user ? user.firstname : localUser.firstname} </h1>
                    {message ? <p><Alert severity={color}>{message}</Alert></p> : ""}
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <form onSubmit={formik.handleSubmit} className="loginForm">
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Civilité</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="civility"
                                    >
                                        <FormControlLabel value="M" control={<Radio />} label="M" />
                                        <FormControlLabel value="Mme" control={<Radio />} label="Mme" />

                                    </RadioGroup>
                                </FormControl>
                                <TextField
                                    fullWidth
                                    id="firstname"
                                    name="firstname"
                                    label="Votre nom"
                                    value={formik.values.firstname}
                                    onChange={formik.handleChange}
                                    error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                                    helperText={formik.touched.firstname && formik.errors.firstname}
                                    spacing={5}
                                />
                                <TextField
                                    fullWidth
                                    id="lastname"
                                    name="lastname"
                                    label="Votre prénom"
                                    value={formik.values.lastname}
                                    onChange={formik.handleChange}
                                    error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                                    helperText={formik.touched.lastname && formik.errors.lastname}
                                    spacing={5}
                                />
                                <TextField
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="Email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                    spacing={5}
                                />

                                <Button color="primary" variant="contained" fullWidth type="submit">
                                    Modifier
                                </Button>
                            </form>
                        </Grid>
                    </Grid>

                </Paper>
            </main>
        );
    }
}
