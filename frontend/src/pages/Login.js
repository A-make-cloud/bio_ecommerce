import NavBar from '../components/layouts/Navbar.js'
import Footer from '../components/layouts/Footer.js'
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

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
        email: 'foobar@example.com',
        password: 'foobar',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            //alert(JSON.stringify(values, null, 2));
            fetch('http://localhost:9000/users/login', {
                method:'POST',
                headers:{
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*'
                },
                body:JSON.stringify(values)
            })
            .then(r=>r.json(r))
            .then(result=>{
                if(result.error==='user not found'){
                    alert('Email inconnu !')
                    return
                }
                if(result.error==='wrong password'){
                    alert('Mauvais mot de passe !')
                    return
                }
                // stocker des parametres de l'utilisateur quelque part ? ---> result.firstname id et lastname
                //redirection si succès pour se connecter :
                navigate('/')
            })
            .catch(err=>{
                console.log('y 1 erreur : ', err)
                if (err.message === 'Failed to fetch')
                    alert('Une erreur est survenue sur le réseau !')
                //alert('Une erreur est survenue ! ', err);
            })


        },
    });


    return (
        <>
            <NavBar />
            <main className="basketPage">
                <h1>Connectez-vous</h1>


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
                        Submit
                    </Button>
                </form>


            </main>
            <Footer />
        </>
    );
}

export default Login;
