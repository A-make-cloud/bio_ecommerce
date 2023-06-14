const { User } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Cookies = require("cookies");
const { validationResult, matchedData } = require('express-validator');
/**
 * select all user by admin
 * @param {*} req 
 * @param {*} res 
 */
exports.findAll = (req, res) => {
    User.findAll()
        .then(data => {
            if(data.length===0)
                res.status(204).send({ message: "No user found" })
            else
                res.status(200).json({ message: "found user", data })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error Database."
            });
        });
};

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
                res.status(200).json({ message: "Find user", data })
            } else {
                res.status(500).send({ message: `Cannot find user with id=${id}.` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving User with id=" + id });
        });
}
/**find user details by himself with the JWT
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.findSelf = (req, res) => {
    const id = req.user.id// coming from auth middleware checking the JWT
    User.findByPk(id)
        .then(data => {
            if (data){
                const user = {id:data.id, civility:data.civility, firstname:data.firstname, 
                    lastname:data.lastname, email:data.email, profil:data.profil, status:data.status}
                res.status(200).json({ message: "Found user", user })
            } else 
                res.status(500).send({ message: `Cannot find user with id=${id}.` })
        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving User with id=" + id })
        }
    )
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
                res.status(200).json({ message: "Find user by email", data })
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
    //4------------------Envoyer le mail de validation   ==>>TODO

    //-----------token vérifié dans middelware middelwareAuth.js qui envoi ancien détails du user dans req.user
    //-----------et on a les nouveaux détails qui arrivent dans le body

    //valider formulaire
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msg = errors.array().map(e=>e.msg).join(' - ')
        return res.status(400).json({ error: msg });
    }
    //recuperer le body nettoyé par express validator récupérable avec matchedData()
    const cleanedDBody = matchedData(req);
    //const userUpdate = {id:req.user.id, ...req.body}
    const userUpdate = {id:req.user.id, ...cleanedDBody}

    //si modif voir s'il existe deja :
    User.findByPk(userUpdate.id)
        .then(user => {
            if (user) {
                const firstname = userUpdate.firstname;
                const lastname = userUpdate.lastname;
                // const password = userUpdate.password ? userUpdate.password : user.password;
                const email = user.email;
                const civility = userUpdate.civility;
                User.update(
                    { civility, firstname, lastname, email },
                    { where: { id: user.id } }
                ).then(() => {
                    res.status(200).send({
                        message: " Votre compte a bien été modifié "
                    });
                }).catch(err => {
                    res.status(500).send({
                        message: "Erreur modification "
                    });
                });
            } else {
                res.status(500).send({
                    message: `Utilisateur ${id} non trouvé.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Erreur lors de la recherche de l'utilisateur " + id
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

exports.delete = (req, res) => {
    //vérification epress validator du parametre
    const errors = validationResult(req)
    if(!errors.isEmpty){
        console.log(errors.array())
        return res.status(400).json({errors:errors.array()})
    }

    const id = req.params.id;
    User.destroy(
        { where:{id} }
    ).then((data) => {
        res.status(204).send({ message: `User #${id} supprimée`});
    }).catch(err => {
        res.status(500).send({ message: "Erreur lors de la suppression de l'utilisateur" });
    });
}
