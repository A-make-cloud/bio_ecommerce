//const UserRepo = require('../repository/UsersRepository.js');
const jwt = require('jsonwebtoken');
const Cookies = require("cookies");
require('dotenv').config();
const bcrypt = require('bcrypt');
//const UserController = require('./UserController');
const { User } = require('../../models');

exports.process = (req, res) => {

    //1---------------recuperer le body ==>>TODO
    //2----------------valider form ==>>TODO
    //3---------------------Ajouter user  ==>>OK
    //4------------------Envoyer le mail de validation   ==>>TODO


    //1---------------recuperer le body ==>>OK

    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const civility = req.body.civility ? req.body.civility : "M";
    //2----------------valider form ==>>TODO
    User.findOne({ where: { email } })
        .then(exist => {
            if (!exist) {
                //3---------------------Ajouter ==>>OK
                User.create({
                    civility,
                    firstname,
                    lastname,
                    profil: 'client',
                    status: 1,
                    email,
                    password,
                    token: '',
                }).then((user) => {
                    //4--------------generer le JWT  ==>>OK
                    let accessToken = jwt.sign({
                        id: user.id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        profil: user.profil,
                    },
                        process.env.SECRET_JWT, { expiresIn: 604800 }
                    );
                    new Cookies(req, res).set("access_token", accessToken, {
                        httpOnly: true, //utilisation uniquement via requete http
                        secure: false, //true pour forcer l'utilisation https
                    });


                    res.status(200).json({ message: "Votre compte a bien été enregistré", user })
                }).catch(err => {
                    res.status(500).json({ error: err.message || "Error Database." })
                })


            } else {
                res.status(500).send({
                    message: "Email  existe deja "
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with email=" + email
            });
        });
}

