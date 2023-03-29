
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Alert } from '@mui/material';

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
                    console.log(response.status)
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


                    setMessage(result.message)
                    if (result.user) {
                        // stocker des parametres de l'utilisateur quelque part ? ---> result.firstname id et lastname
                        //console.log(result.user)
                        connectUser(result.user) //add user to local storage //AuthContext.js

                        //setISlogged and add to local storage // AuthContext.js
                        updateIslogged('true')

                        //redirection vers espace admin || client
                        const profil = result.user.profil
                        updateProfil(profil)

                        // console.log("-------profil", profil)

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

            {isLogged ? <h1>Espace personnel</h1> : <h1>Formulaire</h1>}

            {message ? <Alert severity={color}>{message}</Alert> : ""}

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
                />
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Se connecter
                </Button>
            </form>


        </main>

    );
}

export default Login;
