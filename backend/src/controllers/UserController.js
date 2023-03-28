
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Cookies = require("cookies");

exports.login = async (req, res) => {

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

                console.log("data--------->>", user)
                //----------compte actif
                if (user.status == 3) {
                    res.status(500).send({
                        message: "Compte désactivé "
                    });
                } else {
                    //3-------------verifier le password ==>>OK
                    bcrypt.compare(password, user.password, function (err, result) {
                        if (err) {
                            res.status(500).send({
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
                            res.status(500).send({
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
    //res.status(201).json({ login: req.body.email, password: req.body.password, user: user })


}


exports.findAll = (req, res) => {
    User.findAll()
        .then(data => {
            console.log(data)
            res.status(201).json({ message: "Find user", data })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error Database."
            });
        });
};

exports.register = (req, res) => {
    //1---------------recuperer le body ==>>TODO
    //2----------------valider form ==>>TODO
    //3---------------------Ajouter user  ==>>OK
    //4------------------Envoyer le mail de validation   ==>>TODO


    //3---------------------Ajouter ==>>OK
    const element = {
        civility: 'M',
        firstname: 'Bela',
        lastname: 'Sam',
        profil: 'admin',
        email: 's1@gmail.com',
        password: 'password123',
        token: 'pdasswfrd123',
    }

    User.create(element).then((user) => {
        res.status(201).json({ message: "Created user", user })
    }).catch(err => {
        res.status(500).json({ error: err.message || "Error Database." })
    })


}



exports.findById = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            if (data) {
                res.status(201).json({ message: "Find user", data })
            } else {
                res.status(500).send({
                    message: `Cannot find user with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
}


exports.findByEmail = (req, res) => {
    const email = req.params.email;

    User.findOne({ where: { email } })
        .then(data => {
            if (data) {
                res.status(201).json({ message: "Find user by email", data })
            } else {
                res.status(500).send({
                    message: `Cannot find user with email=${email}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with email=" + email
            });
        });
}

