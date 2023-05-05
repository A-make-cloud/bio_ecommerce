const sequelize = require('sequelize');
const db = require('../../models/index')
const { Commande, Commande_line, User, Address, Product } = require('../../models');

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

exports.getAddresses = (req, res) => {
    const user_id = req.user?.id ?? ''
    //const user_id = 5
    Address.findAll({ where: { user_id } })
        .then(data => {
            if (data.length) {
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
    // on vérifie d'abors que l'adresse à être modifiée existe et appartient bien à l'utilisateur identifié
    const user_auth_id = req.user.id
    const { id, type, street, complement, city, zipcode, information } = req.body
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
    // on vérifie d'abors que le type d'adresse à être créé n'existe déja pas pour l'utilisateur identifié
    const user_id = req.user.id
    const { type, street, complement, city, zipcode, information } = req.body
    //const user_id=5; const type='livraison'
    /*SELECT COUNT(*) FROM addresses WHERE user_id=5 AND type='livraison'*/
    Address.count({ where: { user_id, type } })
    .then(dataExists => {
        //console.log(dataExists===1)
        if (dataExists===0) {
            Address.create({ user_id, type, street, complement, city, zipcode, information }
            ).then((data) => {
                res.status(201).json({ message: `Addresse de ${type} créée`, data:data.dataValues });
            }).catch(err => {
                res.status(500).send({ message: "Erreur lors de la création d'adresse" });
            });
        } else {
            res.status(403).send({ message: `This creation is not possible as an address already exists` });
        }
    })
    .catch(err => {
        res.status(500).send({ message: `Error creating addresse` });
    });
}

exports.adminOrders = (req, res) => {
    /*Commande.findAll({        
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
            res.status(200).json({data})
        } else {
            res.status(204).send({ message: `no orders` });
        }
    })
    .catch(err => {
        res.status(500).send({ message: `Error retrieving orders`, err:err });
    });
}

exports.adminOrderProgress = (req, res) => {
    const id = req.params.id;
    const { state, notes } = req.body
    Commande.update(
        { state, notes },
        { where: { id } }
    ).then(() => {
        res.status(200).send({ message: `Commande mise à jour` });
    }).catch(err => {
        res.status(500).send({ message: "Erreur modification" });
    });
}