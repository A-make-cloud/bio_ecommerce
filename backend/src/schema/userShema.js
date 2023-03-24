const Joi = require('joi');
exports.schemaConnexion = Joi.object({
    email: Joi.string().min(5).required().email()
        .messages({
            'string.email': 'Le champ email doit être une adresse email valide',
            'string.empty': 'Le champ email est obligatoire',
            'string.min': "L 'email doit avoir au moins {{#limit}} caractères",
        }),
    password: Joi.string().min(8).required().email()
        .messages({
            'string.email': 'Le champ email doit être une adresse email valide',
            'string.empty': 'Le champ email est obligatoire',
            'string.min': "L 'email doit avoir au moins {{#limit}} caractères",
        }),
});

exports.schemaRegister = Joi.object({
    email: Joi.string().min(5).required().email()
        .messages({
            'string.email': 'Le champ email doit être une adresse email valide',
            'string.empty': 'Le champ email est obligatoire',
            'string.min': "L 'email doit avoir au moins {{#limit}} caractères",
        }),
    password: Joi.string().min(8).required().email()
        .messages({
            'string.email': 'Le champ email doit être une adresse email valide',
            'string.empty': 'Le champ email est obligatoire',
            'string.min': "L 'email doit avoir au moins {{#limit}} caractères",
        }),
    password: Joi.string().min(8).required().email()
        .messages({
            'string.email': 'Le champ email doit être une adresse email valide',
            'string.empty': 'Le champ email est obligatoire',
            'string.min': "L 'email doit avoir au moins {{#limit}} caractères",
        }),
});