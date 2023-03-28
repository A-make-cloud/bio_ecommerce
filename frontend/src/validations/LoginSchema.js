import * as yup from "yup";

const LoginSchema = {

    email: yup
        .string()
        .email("Veuillez saisir une adresse email valide.")
        .required("Email est obligatoire."),

    password: yup
        .string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères.")
        .required("Le mot de passe est obligatoire"),


};

export default LoginSchema;
