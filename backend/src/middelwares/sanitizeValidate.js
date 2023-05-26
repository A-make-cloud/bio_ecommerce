const { param, body, query, matches, withMessage, trim, notEmpty, isLength, isAlpha } = require('express-validator');
exports.cleanUserForm=[ 
    body('civility').trim()
        .not().isEmpty().withMessage('Le champ "civilité" est requis.')
        .matches(/^(M|Mme)$/).withMessage('Le champ "civilité" doit être soit "M" soit "Mme".')
        .escape(),
    body('firstname').trim()
        .not().isEmpty().withMessage('Le champ "prénom" est requis.')
        .isAlpha().withMessage('Le champ "prénom" doit être composé de lettres.')
        .isLength({min:2}).withMessage('Le champ "prénom" doit faire au moins deux charactères.')
        .escape(),
    body('lastname').trim()
        .not().isEmpty().withMessage('Le champ "nom" est requis.')
        .isAlpha().withMessage('Le champ "nom" doit être composé de lettres.')
        .isLength({min:2}).withMessage('Le champ "nom" doit faire au moins deux charactères.')
        .escape(),
    body('email').trim()
        .not().isEmpty().withMessage('Le champ "email" est requis.')
        .isEmail().withMessage('Le champ "email" doit être un email.')
        .escape(),
    body('password').trim()
        .not().isEmpty().withMessage('Le champ "mot de passe" est requis.')
        .isLength({ min: 8 }).withMessage('Le champ "mot de passe" doit contenir au moins 8 caractères.')
        .matches(/[a-zA-Z]/).withMessage('Le champ "mot de passe" doit contenir au moins une lettre.')
        .matches(/[0-9]/).withMessage('Le champ "mot de passe" doit contenir au moins un chiffre.')
        .escape(),
]

exports.cleanUpdateUser=[
    body('civility').trim()
        .not().isEmpty().withMessage('Le champ "civilité" est requis.')
        .matches(/^(M|Mme)$/).withMessage('Le champ "civilité" doit être soit "M" soit "Mme".')
        .escape(),
    body('firstname').trim()
        .not().isEmpty().withMessage('Le champ "prénom" est requis.')
        .isAlpha().withMessage('Le champ "prénom" doit être composé de lettres.')
        .isLength({min:2}).withMessage('Le champ "prénom" doit faire au moins deux charactères.')
        .escape(),
    body('lastname').trim()
        .not().isEmpty().withMessage('Le champ "nom" est requis.')
        .isAlpha().withMessage('Le champ "nom" doit être composé de lettres.')
        .isLength({min:2}).withMessage('Le champ "nom" doit faire au moins deux charactères.')
        .escape(),
    body('email').trim()
        .not().isEmpty().withMessage('Le champ "email" est requis.')
        .isEmail().withMessage('Le champ "email" doit être un email.')
        .escape(),
]

exports.cleanCatergoriesForm=[
    body('title').trim()
        .not().isEmpty().withMessage('Le champ "titre" est requis.')
        .isAlpha().withMessage('Le champ "titre" doit être composé de lettres.')
        .escape(),
    body('description').if(body('description').not().isEmpty())
        .trim()
        .escape(),
    body('img').if(body('img').not().isEmpty())
        .trim()
        .escape(),
    body('background')
        .not().isEmpty().withMessage('Le champ "couleur" est requis.')
        .trim()
        .escape(),
    body('top').if(body('top').not().isEmpty())
        .trim()
        .escape(),
    body('status').if(body('status').not().isEmpty())
        .trim()
        .matches(/^(1|2)$/).withMessage('Le champ "status" doit être soit "1" soit "2".')
        .escape(),
]

exports.cleanProductForm=[
    body('title')
        .not().isEmpty().withMessage('Le champ "titre" est requis.')
        .trim()
        .escape(),
    body('category_id')
        .not().isEmpty().withMessage('Le champ "catégorie" est requis.')
        .isInt().withMessage('Le champ "catégorie" doit contenir un entier valide.')
        .trim()
        .escape(),
    body('description').if(body('description').not().isEmpty())
        .trim()
        .escape(),
    body('price_ht')
        .not().isEmpty().withMessage('Le champ "prix HT" est requis.')
        .trim()
        .escape(),
    body('tva')
        .not().isEmpty().withMessage('Le champ "tva" est requis.')
        .trim()
        .escape(),
    body('quantity')
        .not().isEmpty().withMessage('Le champ "quantité" est requis.')
        .trim()
        .escape(),
    body('status').if(body('status').not().isEmpty())
        .trim()
        .matches(/^(1|2)$/).withMessage('Le champ "status" doit être soit "1" soit "2".')
        .escape(),
    //body('top').if(body('top').exists())
    body('top').if(body('top').not().isEmpty())
        .trim()
        .escape(),
]

exports.cleanQueryFindall = [
    query('offset').if(query('offset').not().isEmpty()).escape(), 
    query('limit').if(query('limit').not().isEmpty()).escape()
]

//type defaut enum('livraison', 'facturation'), 
//street varchar(50), 
//complement null varchar(255), city varchar(50), zipcode varchar(10), information null 1500
exports.cleanAddressForm = [
    body('type').if(body('type').not().isEmpty())
        .trim()
        .matches(/^(livraison|facturation)$/).withMessage('Le champ "type" doit être soit "livraison" soit "facturation".')
        .escape(),
    body('street').trim()
        .not().isEmpty().withMessage('Le champ "rue" est requis.')
        .isLength({max:50}).withMessage('Le champ "rue" ne doit pas dépasser 50 charactères.')
        .escape(),
    body('complement')
        .if(body('complement').not().isEmpty())
        .trim()
        .isLength({max:255}).withMessage('Le champ "complement" ne doit pas dépasser 255 charactères.')
        .escape(),
    body('city').trim()
        .not().isEmpty().withMessage('Le champ "ville" est requis.')
        .isLength({max:50}).withMessage('Le champ "ville" ne doit pas dépasser 50 charactères.')
        .escape(),
    body('zipcode').trim()
        .not().isEmpty().withMessage('Le champ "code postal" est requis.')
        .isLength({max:10}).withMessage('Le champ "code postal" ne doit pas dépasser 10 charactères.')
        .escape(),
    body('information')
        .if(body('information').not().isEmpty())
        .trim()
        .isLength({max:1500}).withMessage('Le champ "informations" ne doit pas dépasser 1500 charactères.')
        .escape(),
] 

//state def enum('new', 'process', 'expedited', 'canceled'), notes null	varchar(500)
exports.cleanOrderUpdate = [
    body('type').if(body('type').not().isEmpty())
        .trim()
        .matches(/^(new|process|expedited|canceled)$/).withMessage('Le champ "type" doit être "new", "process", "expedited" ou "canceled".')
        .escape(),
    body('notes').if(body('notes').not().isEmpty())
        .trim()
        .isLength({max:500}).withMessage('Le champ "notes" ne doit pas dépasser 500 charactères.')
        .escape(),
] 

exports.cleanOrderUpdate = [
    body('type').if(body('type').not().isEmpty())
        .trim()
        .matches(/^(new|process|expedited|canceled)$/).withMessage('Le champ "type" doit être "new", "process", "expedited" ou "canceled".')
        .escape(),
    body('notes').if(body('notes').not().isEmpty())
        .trim()
        .isLength({max:500}).withMessage('Le champ "notes" ne doit pas dépasser 500 charactères.')
        .escape(),
] 

exports.cleanOrderForm = [



    
]
