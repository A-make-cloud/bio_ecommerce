import { useContext, useEffect, useState } from 'react';
import NavbarClient from './NavbarClient';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
//import { useNavigate } from 'react-router-dom';
import { Alert, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup } from '@mui/material';
import { AuthContext } from '../../contexts/AuthContext'
export default function Profil() {
    const { updateProfil, connectUser } = useContext(AuthContext);
    const localUser = useContext(AuthContext).user;
    //const navigate = useNavigate();
    const [user, setUser] = useState({...localUser, civility:localUser.civility??'Mme'});
    //const accessToken = localUser.accessToken
    useEffect(() => {
        //recuperer les info de la base de donnée 
        fetch(`/users/find-self`)
        .then(response => response.json())
        .then((res) => {
            setUser(res.user)
        })
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
//console.log(user)
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
            fetch('/users/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values, null, 2),
                credentials: 'include' // inclure les cookies dans la requête
            })
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    } else if (response.status === 400){
                        setColor("error")
                        response.json().then(result=>{
                            setMessage(result.error)
                        })
                    }else{
                        throw new Error()
                    }
                })
                .then(result => {
                    setColor("success")
                    setMessage(result.message)
                    connectUser({profil:localUser.profil, id:localUser.id, ...values})
                    //updateProfil(values)
                    //pas de redirection si succès pour se connecter, car on est déja connecté
                })
                .catch(err => {
                    console.log('y 1 erreur : ', err)
                    if (err.message === 'Failed to fetch'){
                        setColor("error")
                        setMessage('Une erreur est survenue sur le réseau !')
                    }else{
                        setColor("error")
                        setMessage('Une erreur est survenue ! ')
                    }
                })
        },
    });
    if (user) {
        return (
            <main className="clientBody">
                <NavbarClient />
                <div className="clientContent">
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
                    <h1>Mon profil  {localUser ? localUser.firstname : user.firstname } </h1>
                    {message ? <Alert severity={color}>{message}</Alert> : ""}
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <form onSubmit={formik.handleSubmit} className="loginForm">
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Civilité</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="civility"
                                        value={formik.values.civility}
                                        onChange={formik.handleChange}
                                    >
                                        <FormControlLabel value="M" control={<Radio />} label="M" />
                                        <FormControlLabel value="Mme" control={<Radio />} label="Mme" />
                                    </RadioGroup>
                                </FormControl>
                                <TextField
                                    fullWidth
                                    id="firstname"
                                    name="firstname"
                                    label="Votre prénom"
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
                                    label="Votre nom"
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
                </div>
            </main>
        );
    }
}
