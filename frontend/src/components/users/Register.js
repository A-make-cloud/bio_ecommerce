import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { Alert, Button, TextField } from '@mui/material';
import LoginSchema from '../../validations/LoginSchema'

console.log(LoginSchema)


const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

console.log(validationSchema)
const Register = () => {

    const [isLogged, setIsLogged] = useState(false)
    const [color, setColor] = useState()
    const [message, setMessage] = useState()
    const formik = useFormik({
        initialValues: {
            email: 'foobar@example.com',
            password: 'foobar',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {

            await fetch('/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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
                        setIsLogged(true)
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data)
                    // alert(data.message)
                    setMessage(data.message)
                })
                .catch(error => console.error(error));






        },
    });


    return (
        <div>
            {isLogged ? <h1>Vous etre bien connecté</h1> : <h1>Formulaire</h1>}

            <Alert severity={color}>{message}</Alert>

            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
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
                    Submit
                </Button>
            </form>
        </div>
    );
};


export default Register;
