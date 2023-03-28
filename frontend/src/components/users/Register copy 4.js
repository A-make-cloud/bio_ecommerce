import React from 'react';
import { Formik } from 'formik';
import RegisterSchema from '../../validations/RegisterSchema'
import { Button, Card, CardActions, CardContent, TextField } from '@mui/material';
// import withStyles from "@material-ui/core/styles/withStyles";


//-----------initial values 
const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
};
//------------submit form 
const handleSubmit = (values) => {
    console.log(values);
};


const Register = ({ classes }) => (
    <Formik
        validationSchema={RegisterSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
    >
        {props => (
            <form onSubmit={handleSubmit}>
                <Card >
                    <CardContent>
                        <TextField
                            id="firstname"
                            label="Firstname"
                            value={props.values.firstname}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={props.touched.website ? props.errors.website : ""}
                            error={props.touched.website && Boolean(props.errors.website)}
                            margin="dense"
                            variant="outlined"
                            fullWidth
                        />

                    </CardContent>
                    <CardActions >
                        <Button type="submit" color="primary" >
                            SUBMIT
                        </Button>

                    </CardActions>
                </Card>
            </form>
        )}
    </Formik>
);



export default Register
// export default withStyles(styles)(Register);