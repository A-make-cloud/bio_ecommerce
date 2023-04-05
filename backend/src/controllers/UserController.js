
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Cookies = require("cookies");


/**
 * select all user by admin
 * @param {*} req 
 * @param {*} res 
 */
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

/**
 * 
-à modifier si formulaire 
 * create user by admin 
 * @param {*} req 
 * @param {*} res 
 */
exports.create = (req, res) => {
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
        email: 's21@gmail.com',
        password: 'password123',
        token: 'pdasswfrd123',
    }

    User.create(element).then((user) => {
        res.status(201).json({ message: "Created user", user })
    }).catch(err => {
        res.status(500).json({ error: err.message || "Error Database." })
    })


}


/**find user by id
 * 
 * @param {*} req 
 * @param {*} res 
 */
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

/**
 * find user by email
 * @param {*} req 
 * @param {*} res 
 */
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

/**
 * update form  profil
 * @param {*} req 
 * @param {*} res 
 */

exports.update = (req, res) => {

    //1---------------recuperer le body ==>>TODO
    //2----------------valider form ==>>TODO
    //3---------------------Ajouter user  ==>>OK
    //4------------------Envoyer le mail de validation   ==>>TODO


    //------------verification du token dans middelware middelwareAuth.js envoi user dans req.user

    const userUpdate = req.user

    //2----------------valider form ==>>TODO
    //*
    User.findByPk(userUpdate.id)
        .then(user => {
            if (user) {

                // console.log('user-------->>', user)
                const firstname = userUpdate.firstname;
                const lastname = userUpdate.lastname;
                // const password = userUpdate.password ? userUpdate.password : user.password;
                const email = user.email;//todo si modif voir s'il existe deja 

                User.update(
                    { firstname, lastname, email },
                    { where: { id: user.id } }
                ).then(() => {
                    res.status(200).send({
                        message: " Votre compte a bien été modifié "
                    });

                }).catch(err => {
                    res.status(500).send({
                        message: "Error modification "
                    });
                });

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




    //*/







    /*
    
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
    //*/



}


