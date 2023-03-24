const { BaseError } = require('sequelize');
const { Product, Image } = require('../../models');



exports.findAll = (req, res) => {
    Product.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error Database."
            });
        });
};

exports.findById = (req, res) => {
    const id = req.params.id;

    Product.findByPk(id)
        .then(data => {
            if (data) {
                res.status(201).json({ message: "Find Product", data })
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


exports.findByCategory = (req, res) => {
    const categoryId = req.params.categoryId;

    Product.findAll({ where: { categoryId } })
        .then(data => {
            if (data) {
                res.status(201).json({ message: "Find Product", data })
            } else {
                res.status(500).send({
                    message: `Cannot find Product with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Product with id=" + id
            });
        });
}
exports.create = (req, res) => {
    //1---------------recuperer le body ==>>TODO
    //2----------------valider form ==>>TODO
    //3---------------------Ajouter Product  ==>>OK
    //4---------------------Ajouter images ===>>TODO

    const categoryId = req.params.categoryId;
    //3---------------------Ajouter ==>>OK
    const element = {
        categoryId,
        title: 'titre img ',
        description: 'description',
        price_ht: 10.20,
        tva: 20.25,
        quantity: 30,


    }
    Product.create(element).then((product) => {

        console.log(product.id);
        const productId = product.id
        //-------------create image
        // `productId`, `title`, `url`, `type`,
        try {
            console.log(Image.create({ productId, title: 'title img 1', url: 'url img 1' }))
            Image.create({ productId, title: 'title img 2', url: 'url img 2' })
            Image.create({ productId, title: 'title img 3', url: 'url img 3' })

            res.status(201).json({ message: "Created product", product })

        } catch (err) {
            console.log("----------------------", err)
            res.status(500).json({ error: err.message || "Error Database." })

        }



    }).catch(err => {
        res.status(500).json({ error: err.message || "Error Database." })
    })


}