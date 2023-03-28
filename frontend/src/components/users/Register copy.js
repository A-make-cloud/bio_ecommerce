import React from 'react';
import { Form, Formik } from 'formik';
import RegisterSchema from '../../validations/RegisterSchema'
import { withStyles, Button, Card, CardActions, CardContent, TextField } from '@mui/material';


//-------style 
const styles = () => ({
    card: {
        maxWidth: 420,
        marginTop: 50
    },
    container: {
        display: "Flex",
        justifyContent: "center"
    },
    actions: {
        float: "right"
    }
});

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
                <Card className={props.classes.card}>
                    <CardContent>
                        <TextField
                            id="firstname"
                            label="Firstname"
                            value={props.value.firstname}
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            helperText={props.touched.website ? props.errors.website : ""}
                            error={props.touched.website && Boolean(props.errors.website)}
                            margin="dense"
                            variant="outlined"
                            fullWidth
                        />

                    </CardContent>
                    <CardActions className={props.classes.actions}>
                        <Button type="submit" color="primary" disabled={props.isSubmitting}>
                            SUBMIT
                        </Button>
                        <Button color="secondary" onClick={props.handleReset}>
                            CLEAR
                        </Button>
                    </CardActions>
                </Card>
            </form>
        )}
    </Formik>
);




export default withStyles(styles)(Register);