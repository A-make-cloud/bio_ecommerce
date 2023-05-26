const { BaseError, fn, col, Op} = require('sequelize');
const sequelize = require('sequelize');
const { Product, Image } = require('../../models');
const { validationResult, matchedData } = require('express-validator');

exports.findAllActive = (req, res) => {
    const offset = req.query.offset ? parseInt(req.query.offset) : null;
    const limit = req.query.limit ? parseInt(req.query.limit) : null;

    Product.findAll({ where: { status: '1' }, offset: offset, limit: limit, include: Image })
    .then(async data => {
        if (data) {
            await Promise.allSettled(data.map(async (product) => {
                const images = await product.getImages();
                product.dataValues.listeImage = images;
            }));
            res.status(200).json({ data });
        } else {
            res.status(500).send({
                message: `Cannot find Products.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Error retrieving Products.`
        });
    });
};

exports.findAll = (req, res) => {

    const offset = req.query.offset ? parseInt(req.query.offset) : null;
    const limit = req.query.limit ? parseInt(req.query.limit) : null;

    Product.findAll({ offset: offset, limit: limit, include: Image })
        .then(async data => {
            if (data) {

                await Promise.allSettled(data.map(async (product) => {
                    const images = await product.getImages();
                    product.dataValues.listeImage = images;
                }));

                res.status(200).json({ data });
            } else {
                res.status(500).send({
                    message: `Cannot find Products.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Products.`
            });
        });
    // Product.findAll({ offset: offset, limit: limit, include: Image })
    //     .then(async data => {

    //         if (data) {
    //             const array = data.forEach(product => {
    //                 product.getImages().then((images) => {
    //                     product.listeImage = images
    //                     console.log("-------------image product " + product.id, images);
    //                 });
    //             });



    //             res.status(200).json({ message: "Find Products", data })
    //         } else {
    //             res.status(500).send({
    //                 message: `Cannot find Products .`
    //             });
    //         }
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: `Error retrieving Products.`
    //         });
    //     });
};

exports.findTop = (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    Product.findAll({ order: [['top', 'DESC'], ['quantity', 'DESC']], limit: limit, include: Image })
        .then(async data => {
            if (data) {

                await Promise.allSettled(data.map(async (product) => {
                    const images = await product.getImages();
                    product.dataValues.listeImage = images;
                }));

                res.status(200).json({ data });
            } else {
                res.status(500).send({
                    message: `Cannot find Products.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Products.`
            });
        });
}

exports.findById = (req, res) => {
    const id = req.params.id;
    Product.findByPk(id)
        .then(data => {
            if (data) {
                res.status(200).json({ data })
            } else {
                res.status(204).send({ message: `Cannot find product with id=${id}.` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving product with id=" + id });
        });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.findByCategory = (req, res) => {
    const category_id = req.query.category_id ? parseInt(req.query.offset) : [1, 2, 3, 4];
    const offset = req.query.offset ? parseInt(req.query.offset) : null;
    const limit = req.query.limit ? parseInt(req.query.limit) : null;


    Product.findAll({ where: { category_id }, offset: offset, limit: limit })
        .then(data => {
            if (data) {
                res.status(200).json({ message: "Find Product", data })
            } else {
                res.status(401).send({
                    message: `Cannot find Product with category_id=${category_id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Product with category_id=${category_id}.`
            });
        });
}
exports.create = (req, res) => {

    //valider ou non le formulaire
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msg = errors.array().map(e=>e.msg).join(' - ')
        return res.status(400).json({ error: msg });
    }
    //recuperer le body nettoyé
    const newProduct = matchedData(req);

    Product.create(newProduct).then((product) => {
        res.status(201).json({ message: `Produit "${product.title}" ajouté`, product })
        /*
                const product_id = product.id
                //-------------create image
                // `product_id`, `title`, `url`, `type`,
                try {
                    console.log(Image.create({ product_id, title: 'title img 1', url: 'url img 1' }))
                    Image.create({ product_id, title: 'title img 2', url: 'url img 2' })
                    Image.create({ product_id, title: 'title img 3', url: 'url img 3' })
        
                    res.status(201).json({ message: "Created product", product })
        
                } catch (err) {
                    console.log("----------------------", err)
                    res.status(500).json({ error: err.message || "Error Database." })
                }*/

    }).catch(err => {
        console.log(err)
        res.status(500).json({ error: err.message || "Erreur base de données." })
    })
}

exports.update = (req, res) => {
    //valider ou non le formulaire
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msg = errors.array().map(e=>e.msg).join(' - ')
        return res.status(400).json({ error: msg });
    }
    const id = req.params.id;
    //body nettoyé
    const {category_id, title, description, price_ht, tva, quantity, status, top}=matchedData(req)
    Product.update(
        { category_id, title, description, price_ht, tva, quantity, status, top },
        { where: { id } }
    ).then(() => {
        res.status(200).send({ message: `Produit ${title} mis à jour` });
    }).catch(err => {
        res.status(500).send({ message: `Erreur modification du produit ${title}` });
    });
}
