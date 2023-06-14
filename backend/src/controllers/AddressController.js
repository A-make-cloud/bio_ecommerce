const sequelize = require('sequelize');
const db = require('../../models/index')
const { Commande, Commande_line, User, Address, Product } = require('../../models');
const { validationResult, matchedData } = require('express-validator');
const { unescape, unescapeAll, unescapeThose } = require('../middelwares/unescapeJson')

exports.getAddresses = (req, res) => {
    const user_id = req.user?.id ?? ''
    //Address.findAll({ where: { user_id } })
    // /!\ We can not easily use the sequelize models as there is a UNION in the request and we need to get the last created facturation address!
    db.sequelize.query(
        `SELECT * FROM addresses WHERE user_id = :user_id AND type='livraison'
        UNION 
        SELECT * FROM addresses WHERE user_id = :user_id AND type='facturation' 
            AND created_at = (
                SELECT MAX(created_at) FROM addresses 
                    WHERE user_id = :user_id AND type='facturation'
            );`
        , { replacements: { user_id },
        type: sequelize.QueryTypes.SELECT 
    })
    .then(data => {
        if (data.length) {
            //un-escape some escaped data:
            data.forEach(oneData=>{
                oneData.information=unescape(oneData.information)
                oneData.street=unescape(oneData.street)
            })
            res.status(200).json({ message: "Found addresses", data })
        } else {
            res.status(204).send({ message: `No addresses with user_id=${user_id}.` });
        }
    })
    .catch(err => {
        //pas de commandes en bdd, on arrive ici /?\
        console.log(err)
        res.status(500).send({ message: `Error retrieving addresses with user_id=${user_id}.` });
    });
}

exports.updateAddress = (req, res) => {
    //valider ou non les données du formulaire
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msg = errors.array().map(e=>e.msg).join(' - ')
        return res.status(400).json({ error: msg });
    }
    //recuperer le body nettoyé
    const { type, street, complement, city, zipcode, information } = matchedData(req);
    const { id } = req.body
    // on vérifie d'abors que l'adresse à être modifiée existe et appartient bien à l'utilisateur identifié
    const user_auth_id = req.user.id
    Address.findAll({ where: { id, type } })
    .then(data => {
        if (data[0].dataValues.user_id===user_auth_id) {
            Address.update(
                { street, complement, city, zipcode, information },
                { where: { id, type } }
            ).then(() => {
                res.status(200).send({ message: `Addresse de ${type} mise à jour` });
            }).catch(err => {
                res.status(500).send({ message: "Erreur modification" });
            });
        } else {
            res.status(403).send({ message: `This update is forbidden` });
        }
    })
    .catch(err => {
        res.status(500).send({ message: `Error retrieving address` });
    });
}

exports.createAddress = (req, res) => {
    //valider ou non les données du formulaire
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msg = errors.array().map(e=>e.msg).join(' - ')
        return res.status(400).json({ error: msg });
    }
    //recuperer le body nettoyé
    const { type, street, complement, city, zipcode, information } = matchedData(req);

    const user_id = req.user.id

    // on vérifie d'abors que le type d'adresse à être créé n'existe déja pas pour l'utilisateur identifié (livraison)
    /*SELECT COUNT(*) FROM addresses WHERE user_id=5 AND type='livraison'*/
    Address.count({ where: { user_id, type } })
    .then(dataExists => {
        //console.log(dataExists===1)
        if (dataExists===0 || type==='facturation') {
            Address.create({ user_id, type, street, complement, city, zipcode, information }
            ).then((data) => {
                res.status(201).json({ message: `Addresse de ${type} créée`, data:data.dataValues });
            }).catch(err => {
                res.status(500).send({ error: "Erreur lors de la création d'adresse" });
            });
        } else {
            res.status(403).send({ message: `La création n'est pas possible car une addresse de ce type existe déjà.` });
        }
    })
    .catch(err => {
        res.status(500).send({ error: `Error creating addresse` });
    });
}
