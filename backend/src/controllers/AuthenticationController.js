//const UserRepo = require('../repository/UsersRepository.js');
const jwt = require('jsonwebtoken');
const Cookies = require("cookies");
require('dotenv').config();
const bcrypt = require('bcrypt');
//const UserController = require('./UserController');
const { User } = require('../../models');

exports.process = (req, res) => {

    //1------------valider les post  ==>>TODO
    //2-------------verifier l 'email ==>>OK
    //3-------------verifier le password ==>>OK
    //4--------------generer le JWT  ==>>OK


    //recuperer email login 
    email = req.body.email;
    password = req.body.password;

    User.findOne({ where: { email } })
        .then(user => {
            if (user) {

                console.log("data--------->>", user.status)
                //----------compte actif
                if (user.status == 3) {
                    res.status(401).send({
                        message: "Compte désactivé "
                    });
                } else {
                    //3-------------verifier le password ==>>OK
                    bcrypt.compare(password, user.password, function (err, result) {
                        if (err) {
                            res.status(401).send({
                                message: err
                            });
                        } else if (result) {

                            console.log('Le mot de passe ok  !');
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

                            res.status(200).send({
                                message: "connexion ok"
                            });


                        } else {
                            res.status(401).send({
                                message: "Login ou mot de passe invalide"
                            });
                        }
                    });
                }



                // return data
            } else {
                res.status(500).send({
                    message: "Login ou mot de passe invalide"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with email=" + email
            });
        });
}

exports.disconnect = (req, res) => {
    delete req.session.user;
    res.status(200).json({ message: "user logged out", id: user.id })
    //renvoyer une réponse ?
}
