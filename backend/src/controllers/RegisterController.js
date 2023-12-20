//const UserRepo = require('../repository/UsersRepository.js');
const jwt = require('jsonwebtoken');
const Cookies = require("cookies");
require('dotenv').config();
//const UserController = require('./UserController');
const { User } = require('../../models');
const { validationResult, matchedData } = require('express-validator');

exports.process = (req, res) => {
    //valider formulaire
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msg = errors.array().map(e=>e.msg).join(' - ')
        return res.status(400).json({ error: msg });
    }
    //recuperer le body nettoyé par express validator récupérable avec matchedData()
    const cleanedBody = matchedData(req);
    const { email, password, firstname, lastname, civility } = cleanedBody

    User.findOne({ where: { email } })
        .then(exist => {
            if (!exist) {
                //Ajouter dans bdd
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
                    //generer le JWT - todo : à tester
                    let accessToken = jwt.sign({
                        id: user.id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        profil: user.profil,
                    },
                        process.env.SECRET_JWT, { expiresIn: 604800 }
                    );
                    /*new Cookies(req, res).set("access_token", accessToken, {
                        httpOnly: true, //utilisation uniquement via requete http
                        secure: false, //true pour forcer l'utilisation https
                    });*/
                    res.cookie("access_token", accessToken, { maxAge: 3 * 60 * 60 * 1000, httpOnly: true, secure: false });

                    res.status(200).json({ message: "Votre compte a bien été enregistré", user })
                }).catch(err => {
                    res.status(500).json({ error: err.message || "Erreur avec la base de données" })
                })
            } else {
                res.status(500).send({
                    message: "Email existe dejà"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Erreur pour récupérer l'email : " + email
            });
        });
}

