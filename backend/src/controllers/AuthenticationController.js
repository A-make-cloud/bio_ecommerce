//const UserRepo = require('../repository/UsersRepository.js');
const jwt = require('jsonwebtoken');
//const Cookies = require("cookies");
require('dotenv').config();
const bcrypt = require('bcrypt');
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
                //----------compte actif
                if (user.status == 3) {
                    res.status(401).send({ message: "Compte désactivé" });
                } else {
                    //3-------------verifier le password ==>>OK
                    bcrypt.compare(password, user.password, function (err, result) {
                        if (err) {
                            res.status(401).send({ message: err });
                        } else if (result) {
                            //4--------------generer le JWT  ==>>OK
                            let accessToken = jwt.sign({
                                id: user.id,
                                firstname: user.firstname,
                                lastname: user.lastname,
                                profil: user.profil,
                                email: user.email,
                            },
                                process.env.SECRET_JWT, { expiresIn: 3 * 60 * 60 }
                            );
                            //----methode 1 Cookie
                            /*const cookie = new Cookies(req, res).set("access_token", accessToken, {
                                httpOnly: true, //utilisation uniquement via requete http
                                secure: false, //true pour forcer l'utilisation https
                            });*/
                            res.cookie("access_token", accessToken, { maxAge: 3 * 60 * 60 * 1000, httpOnly: true, secure: false });
                                //console.log('accessToken',accessToken)
                            res.status(200).send({
                                message: "connexion ok",
                                user: {
                                    id: user.id,
                                    firstname: user.firstname,
                                    lastname: user.lastname,
                                    profil: user.profil,
                                    email: user.email,
                                    //accessToken, surtout pas
                                },
                            });
                        } else {
                            res.status(401).send({ message: "Login ou mot de passe invalide" });
                        }
                    });
                }
            } else {
                res.status(500).send({ message: "Login ou mot de passe invalide" });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving User with email=" + email });
        });
}

exports.deletecookie = (req, res) => {
    res.cookie('access_token', '', { 
        expires: new Date(0),
        httpOnly: true,
        secure: true,
        sameSite: 'strict', // si le cookie a l'attribut SameSite à 'strict'
    });
    res.send({ message:'Vous êtes maintenant déconnecté' });
    //delete req.session.user;
    //res.status(200).json({ message: "user logged out", id: user.id })
    //renvoyer une réponse ?
}
