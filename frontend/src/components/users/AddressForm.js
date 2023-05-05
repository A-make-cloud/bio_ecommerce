import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { TextField, Button, Alert } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

function AddressForm({ address, action }) {
    const [color, setColor] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (action?.method === 'post') {
            setColor(`warning`)
            setMessage(`Vous n'avez pas d'adresse de ${action.type} enregistrée. Vous pouvez en enregistrer une ci-dessous :`)
        }
    }, [action])

    const validationSchema = Yup.object(
        {
            street: Yup.string()
                .required("La rue est obligatoire")
                .min(2, "La rue doit contenir au moins 2 caractères.")
                .max(50, "La rue ne peut pas dépasser 50 caractères")
            ,
            complement: Yup.string()
                .max(250, "Le complément ne peut pas dépasser 250 caractères")
            ,
            city: Yup
                .string()
                .max(50, "La ville ne peut pas dépasser 50 caractères")
                .required("La ville est obligatoire."),
            zipcode: Yup.string()
                .max(10, "Le code postal ne peut pas dépasser 10 caractères")
                .required("Le code postal est obligatoire."),
            information: Yup.string()
                .max(250, "L'information ne peut pas dépasser 250 caractères"),
        }
    );

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            street: address?.street ?? '',
            complement: address?.complement ?? '',
            city: address?.city ?? '',
            zipcode: address?.zipcode ?? '',
            information: address?.information ?? '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            
            if (action?.method === 'post') {
                values.type = action.type
                fetch('/commandes/create-address', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values, null, 2),
                    credentials: 'include'
                })
                    .then(response => {
                        if (response.status === 201){
                            action.method=''
                            setColor("success")
                            setMessage(`Votre adresse de ${action.type} a bien été enregistrée.`)
                            return response.json()
                        } else{
                            setColor("error")
                            setMessage(`L'adresse n'a pas put être enregistrée`)
                        }
                    })
                    .then(result=>{
                        address.id=result.data.id
                        address.type=result.data.type
                    })
                    .catch(err => { 
                        setColor("error")
                        setMessage('Une erreur est survenue sur le réseau !')
                    })

            } else {
                values.type = address.type
                values.user_id = address.user_id
                values.id = address.id
                fetch('/commandes/update-address', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values, null, 2),
                    credentials: 'include'
                })
                    .then(response => {
                        if (response.status === 200) {
                            setColor("success")
                            setMessage(`Votre adresse de ${address.type} a bien été mise à jour.`)
                        }
                        else {
                            setColor("error")
                            setMessage('Une erreur est survenue lors de la modification de votre adresse !')
                        }
                    })
                    .catch(err => { 
                        setColor("error")
                        setMessage('Une erreur est survenue sur le réseau !')
                    })
            }
        },
    });

    return (
        <>
            {message ? <Alert severity={color}>{message}</Alert> : ""}
            <form onSubmit={formik.handleSubmit} className="loginForm">
                <TextField
                    fullWidth
                    id="street"
                    name="street"
                    label="Numéro et rue"
                    value={formik.values.street}
                    onChange={formik.handleChange}
                    error={formik.touched.street && Boolean(formik.errors.street)}
                    helperText={formik.touched.street && formik.errors.street}
                    spacing={5}
                />
                <TextField
                    fullWidth
                    id="complement"
                    name="complement"
                    label="Complément d'addresse"
                    value={formik.values.complement}
                    onChange={formik.handleChange}
                    error={formik.touched.complement && Boolean(formik.errors.complement)}
                    helperText={formik.touched.complement && formik.errors.complement}
                    spacing={5}
                />
                <TextField
                    fullWidth
                    id="city"
                    name="city"
                    label="Ville"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                    spacing={5}
                />
                <TextField
                    fullWidth
                    id="zipcode"
                    name="zipcode"
                    label="Code postal"
                    value={formik.values.zipcode}
                    onChange={formik.handleChange}
                    error={formik.touched.zipcode && Boolean(formik.errors.zipcode)}
                    helperText={formik.touched.zipcode && formik.errors.zipcode}
                    spacing={5}
                />
                <TextField
                    fullWidth
                    id="information"
                    name="information"
                    label="informations complémentaires"
                    value={formik.values.information}
                    onChange={formik.handleChange}
                    error={formik.touched.information && Boolean(formik.errors.information)}
                    helperText={formik.touched.information && formik.errors.information}
                    spacing={5}
                />
                <Button color="primary" variant="contained" fullWidth type="submit">
                    {action?.method === 'post' ? 'enregistrer' : 'Modifier'}
                </Button>
            </form>
        </>
    )
}
export default AddressForm;
