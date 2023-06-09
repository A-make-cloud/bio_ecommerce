
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Alert, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup } from '@mui/material';
import RegisterSchema from '../validations/RegisterSchema';
import { AuthContext } from './../contexts/AuthContext'

function Register() {
    const { isLogged, setIsLogged } = useContext(AuthContext);
    const navigate = useNavigate();

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

            password: yup
                .string()
                .min(8, "Le mot de passe doit contenir au moins 8 caractères.")
                .required("Le mot de passe est obligatoire"),
            confirmPassword: yup
                .string()
                .oneOf([yup.ref("password")], "Le mot de passe ne correspond pas.")
                .required("Confirmer votre mot de passe"),

        }
    );

    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmPassword: '',

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {

            // alert(JSON.stringify(values, null, 2));
            fetch('/users/register', {
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
                        // alert("error")
                        setColor("error")
                    } else {
                        // alert("OK")
                        setColor("success")
                        // setIsLogged(true)
                        // navigate('/dashbord')
                    }
                    return response.json();
                })
                .then(result => {

                    setMessage(result.message)
                    // stocker des parametres de l'utilisateur quelque part ? ---> result.firstname id et lastname
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
                <h1 >Fromulaire d'inscription </h1>
                {message ? <p><Alert severity={color}>{message}</Alert></p> : ""}
                <Grid container spacing={3}>
                    <Grid item xs={12} >
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
                            <TextField
                                fullWidth
                                id="confirmPassword"
                                label="Confirmer votre mot de passe"
                                type="password"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                            />
                            <Button color="primary" variant="contained" fullWidth type="submit">
                                S'inscrire
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            </Paper>





        </main>
    );
}

export default Register;
