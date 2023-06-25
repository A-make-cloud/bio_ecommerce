import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Alert, Grid, Paper, Button, TextField } from '@mui/material';
import { AuthContext } from './../contexts/AuthContext'
function Login() {
    const { updateIslogged, updateProfil, connectUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [color, setColor] = useState('')
    const [message, setMessage] = useState('')
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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values, null, 2),
                credentials: 'include'
            })
                .then(response => {
                    if (response.status !== 200) throw new Error()
                    else setColor("success")
                    return response.json();
                })
                .then(result => {
                    setMessage(result.message)
                    if (result.user) {
                        // stocker des parametres de l'utilisateur
                        connectUser(result.user)
                        updateIslogged('true')
                        const profil = result.user.profil
                        updateProfil(profil)
                        // redirection selon profile
                        if (profil === "admin")
                            navigate('/dashboard')
                        else if (profil === "client")
                            navigate('/client')
                    }
                })
                .catch(err => {
                    setColor("error")
                    if (err.message === 'Failed to fetch') setMessage('Une erreur est survenue sur le réseau !')
                    else setMessage('Le serveur a rencontré un problème. Si le problème persiste, veuillez réesseyer plus tard.')
                })
        },
    });
    return (
        <main className="productsPage">
            <Paper
                sx={{p: 2, m: 'auto', my: 3, maxWidth: 700, flexGrow: 1,
                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
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
