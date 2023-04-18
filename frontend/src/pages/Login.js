
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Alert, Grid, Paper } from '@mui/material';

import { AuthContext } from './../contexts/AuthContext'
function Login() {
    const { isLogged, updateIslogged, updateProfil, connectUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [color, setColor] = useState()
    const [message, setMessage] = useState()
    const validationSchema = yup.object({
        email: yup
            .string('Entrez votre email')
            .email('Entrez un email valide')
            .required('Email est requis'),
        password: yup
            .string('Entrez votre mot de passe')
            .min(8, 'Le mot de passe doit être de 8 charactères minimum')
            .required('Mot de passe est requis'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            //alert(JSON.stringify(values, null, 2));
            fetch('/users/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"

                },
                body: JSON.stringify(values, null, 2),
                credentials: 'include'
            })
                .then(response => {
                    // Affiche le statut de la réponse (par exemple, 200 pour OK)

                    if (response.status !== 200) {
                        setColor("error")
                    } else {
                        setColor("success")
                    }
                    return response.json();
                })
                .then(result => {
                    setMessage(result.message)
                    //console.log('ici', result)
                    if (result.user) {
                        //console.log('l 58',result.user)
                        // stocker des parametres de l'utilisateur quelque part ? ---> result.firstname id et lastname
                        connectUser(result.user) //add user to local storage //AuthContext.js
                        //console.log('parametre de connectUser()', result.user)
                        //setISlogged and add to local storage // AuthContext.js
                        updateIslogged('true')

                        //redirection vers espace admin || client
                        const profil = result.user.profil
                        updateProfil(profil)

                        if (profil === "admin")
                            navigate('/dashboard')
                        else if (profil === "client")
                            navigate('/client')

                    }


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

        <main className="productsPage">


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

                <h1 >Fromulaire de connexion</h1>

                {message ? <Alert severity={color}>{message}</Alert> : ""}
                <Grid container spacing={3}>
                    <Grid item xs={12} >

                        <form onSubmit={formik.handleSubmit} className="loginForm">
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
                                autoComplete="email"
                            />
                            <TextField
                                fullWidth
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                autoComplete="current-password"
                            />
                            <Button color="primary" variant="contained" fullWidth type="submit">
                                Se connecter
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            </Paper>

        </main>

    );
}

export default Login;
