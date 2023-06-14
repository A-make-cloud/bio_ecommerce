const sequelize = require('sequelize');
const db = require('../../models/index')
const { Commande, Commande_line, User, Address, Product } = require('../../models');
const { validationResult, matchedData } = require('express-validator');
const { unescape, unescapeAll, unescapeThose } = require('../middelwares/unescapeJson')

// module.exports = class CommandeController {}
exports.myOrders = (req, res) => {
    const user_id = req.user?.id ?? ''
    //const user_id = 5
    /*SELECT * FROM commandes c JOIN addresses a on c.delivery_address=a.id JOIN addresses ad on c.billing_address=ad.id WHERE c.user_id=5*/
    Commande.findAll({
        where: { user_id },
        include: [
            {
                model: Address,
                as: 'deliveryAddress',
                required: true
            },
            {
                model: Address,
                as: 'billingAddress',
                required: true
            }
        ]
    })
        .then(data => {
            if (data) {
                res.status(200).json({ message: "Found orders", data })
            } else {
                res.status(204).send({ message: `No orders with user_id=${user_id}.` });
            }
        })
        .catch(err => {
            //pas de commandes en bdd, on arrive ici /?\
            console.log(err)
            res.status(500).send({ message: `Error retrieving orders with user_id=${user_id}.` });
        });
}

exports.lineDetails = (req, res) => {
    const id = req.params.id;
    /*SELECT * FROM commandes c JOIN commande_lines l ON c.id=l.commande_id WHERE c.id=1;*/
    Commande.findAll({
        where: { id },
        include: [{
            model: Commande_line,
            include: [
                {
                  model: Product
                }
            ]
        }]
    })
    .then(data => {
        if (data) {
            //console.log(data)
            res.status(200).json({ message: "Found details", data:data[0] })
        } else {
            res.status(204).send({ message: `No commande lines with id=${id}.` });
        }
    })
    .catch(err => {
        //pas de commandes en bdd, on arrive ici /?\
        console.log(err)
        res.status(500).send({ message: `Error retrieving order details with id=${id}.` });
    });
}

exports.adminOrders = (req, res) => {
    /*Commande.findAll({  //Quand ça ne marche pas comme on veut, écrire la requete en MySQL brut avec .query() !!!
        include: [
        {
            model: Address,
            as: 'billingAddress',
            required: false
        },
        {
            model: User,
            as: 'user',
            required: false,
            attributes:['civility', 'firstname', 'lastname', 'email']
        },
        {
            model: Commande_line,
            as: 'Commande_lines',
            attributes: [
                [sequelize.fn('SUM', sequelize.col('price_ht')), 'total']
            ],
            required: false,
            subQuery: false,
            where: {
              'Commande_lines.commande_id': { 'col': 'Commandes.id' }
            },
            group: ['commande_id'],
        }
    ]})*/
    db.sequelize.query(
        `SELECT * FROM commandes c
        JOIN ( SELECT id AS 'a_id', street, city FROM addresses) a1 ON a1.a_id = c.billing_address
        JOIN ( SELECT id AS 'u_id', firstname, lastname FROM users) u ON u.u_id = c.user_id
        LEFT JOIN ( SELECT SUM(price_ht) AS 'total', commande_id FROM commande_lines GROUP BY commande_id) l ON l.commande_id = c.id;`
    , { type: sequelize.QueryTypes.SELECT })
    .then(data => {
        if (data.length) {
            res.status(200).json({data})
        } else {
            res.status(204).send({ message: `no orders` });
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({ message: `Error retrieving orders`, err:err });
    });
}

exports.adminOrderDetails = (req, res) => {
    const id = req.params.id;
    Commande.findOne(
        {        
        where: { id },
        include: [
        {
            model: Address,
            as: 'billingAddress',
            required: false,
            attributes:['street', 'complement', 'city', 'zipcode', 'information']
        },
        {
            model: Address,
            as: 'deliveryAddress',
            required: false,
            attributes:['street', 'complement', 'city', 'zipcode', 'information']
        },
        {
            model: User,
            as: 'user',
            required: false,
            attributes:['civility', 'firstname', 'lastname', 'email']
        },
        {
            model: Commande_line,
            as: 'Commande_lines',
            required: false,
            include:[
                {
                    model: Product,
                    as: 'Product',
                    required: false,
                    attributes:['title']
                },
            ]
        },
    ]})
    .then(data => {
        if (data) {
            //escape some values
            data.dataValues?.notes ? data.dataValues.notes=unescape(data.dataValues.notes) : '';
            data.dataValues?.deliveryAddress?.street ? data.dataValues.deliveryAddress.street=unescape(data.dataValues.deliveryAddress.street) : '';
            data.dataValues?.billingAddress?.street ? data.dataValues.billingAddress.street=unescape(data.dataValues.billingAddress.street) : '';          
            // on ne peut pas utiliser de fonction récursive car sequelize nous renvoie des objets avec des références circulaires
            //const dataNeeded= unescapeAll(data.dataValues)
            res.status(200).json({data:data.dataValues})
        } else {
            res.status(204).send({ message: `no orders` });
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({ message: `Error retrieving orders`, err:err });
    });
}

exports.adminOrderProgress = (req, res) => {
    const id = req.params.id;
    //valider ou non le formulaire
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msg = errors.array().map(e=>e.msg).join(' - ')
        return res.status(400).json({ error: msg });
    }
    //recuperer le body nettoyé
    const { state, notes } = matchedData(req);
    Commande.update(
        { state, notes },
        { where: { id } }
    ).then(() => {
        res.status(200).send({ message: `Commande mise à jour` });
    }).catch(err => {
        res.status(500).send({ error: "Erreur modification" });
    });
}

exports.placeOrder = (req, res) => {
    //récupération de l'utilisateur grace à son authentification
    const user_id = req.user.id
    //récupération des erreurs de validation/nettoyage des données
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msg = errors.array().map(e=>e.msg).join(' - ')
        return res.status(400).json({ error: msg });
    }
    //recuperer le body nettoyé par express validator récupérable avec matchedData()
    const cleanedBody = matchedData(req);
    const { type, name, number, expiration, crypto, code, lines, amount } = req.body//cleanedBody

    //vérifier disponibilité des produits - TODO




    //récupérer les addresses du client
    db.sequelize.query(
        `SELECT id FROM addresses WHERE user_id = :user_id AND type='livraison'
        UNION 
        SELECT id FROM addresses WHERE user_id = :user_id AND type='facturation' 
            AND created_at = (
                SELECT MAX(created_at) FROM addresses 
                    WHERE user_id = :user_id AND type='facturation'
            );`
        , { replacements: { user_id },
        type: sequelize.QueryTypes.SELECT 
    }).then(data=>{
        const delivery_address=data[0].id
        const billing_address=data[1].id
        //continuer avec la creation dans commandes: user_id, reference, delivery_address (id), billing_address (id), state
        //creation de la reference commande au format YYMMDD12345:
        const currentDate = new Date();
        let reference = 'C'+currentDate.getFullYear().toString().slice(-2)+(currentDate.getMonth() + 1).toString().padStart(2, '0')+currentDate.getDate().toString().padStart(2, '0')
        reference += Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000

        Commande.create({
            user_id,
            reference,
            delivery_address,
            billing_address,
            status: 'new',
        }).then((commande) => {
            //creation dans commande_lines pour chaque element de lines : commande_id, product_id, price_ht, tva, quantity
            const formatedLines = lines.map(line=>{
                return {
                    commande_id:commande.id,
                    product_id:line.product_id,
                    price_ht:line.price_ht,
                    tva:line.tva,
                    quantity:line.quantity
                }
            })
            Commande_line.bulkCreate(formatedLines)
            .then((createdLines) => {
                //renvoi un array de commande_line avec une clé dataValues ayant les détails de la creation
                
                //payment avec stripe : type, name, number, expiration, crypto, code, amount - TODO
                const sripeConfirm=true //mis artificiellement à true pour le moment
                




                //m a jour commandes : state, payment_ref
                Commande.update(
                    { payement_ref:'01234',
                        state:'new' },
                    { where: { id:commande.id } }
                ).then(() => {

                    //répondre confirmation à l'utilisateur
                    res.status(200).send({ message: "merci pour votre achat" });

                }).catch()//catch du update de commande
            }).catch((error) => {})//catch du Commande_line.bulkCreate   
        }).catch()//catch du creat command
    }).catch()//catch des addresses du client - TODO: gerer erreurs payement
}
