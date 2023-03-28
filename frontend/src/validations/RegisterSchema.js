import * as yup from "yup";

const RegisterSchema = {
    firstname: yup.string()
        .required("Firstname est obligatoire.")
        .min(2, "Firstname doit contenir au moins 2 caractères.")
    ,
    lastname: yup.string()
        .required("Lastname est obligatoire")
        .min(2, "Lastname doit contenir au moins 2 caractères.")
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

};

export default RegisterSchema;
