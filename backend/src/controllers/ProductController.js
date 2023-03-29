const { BaseError } = require('sequelize');
const { Product, Image } = require('../../models');


exports.findAll = (req, res) => {
    const offset = req.query.offset ? parseInt(req.query.offset) : null;
    const limit = req.query.limit ? parseInt(req.query.limit) : null;

    Product.findAll({ offset: offset, limit: limit })
        .then(data => {
            if (data) {
                res.status(201).json({ message: "Find Products", data })
            } else {
                res.status(500).send({
                    message: `Cannot find Products .`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Products.`
            });
        });
};

exports.findById = (req, res) => {
    const id = req.params.id;

    Product.findByPk(id)
        .then(data => {
            if (data) {
                res.status(201).json({ data })
            } else {
                res.status(500).send({
                    message: `Cannot find user with id=${id}.`
                });
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                message: "Error retrieving product with id=" + id
            });
        });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.findByCategory = (req, res) => {
    const category_id = req.query.category_id ? parseInt(req.query.offset) : [1,2,3,4];
    const offset = req.query.offset ? parseInt(req.query.offset) : null;
    const limit = req.query.limit ? parseInt(req.query.limit) : null;


    Product.findAll({ where: { category_id }, offset: offset, limit: limit })
        .then(data => {
            if (data) {
                res.status(201).json({ message: "Find Product", data })
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
    //1---------------recuperer le body ==>>TODO
    //2----------------valider form ==>>TODO
    //3---------------------Ajouter Product  ==>>OK
    //4---------------------Ajouter images ===>>TODO

    //const category_id = req.params.category_id;
    //3---------------------Ajouter ==>>OK
    console.log( 'req.body----------', req.body)
    const newProduct = req.body
    /*const element = {
        category_id,
        title: 'titre img ',
        description: 'description',
        price_ht: 10.20,
        tva: 20.25,
        quantity: 30,


    }*/
    Product.create(newProduct).then((product) => {
        console.log('----------product--------------',product);
        res.status(201).json({ message: "Created product", product })
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
        res.status(500).json({ error: err.message || "Error Database." })
    })


}