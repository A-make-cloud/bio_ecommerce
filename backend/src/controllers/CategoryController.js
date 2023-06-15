const { Category, Product } = require('../../models');
const { fn, col, literal } = require('sequelize')
const { validationResult, matchedData } = require('express-validator');

exports.findAll = (req, res) => {
    Category.findAll()
        .then(data => {
            res.status(200).json({ data })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error Database."
            });
        });
};

exports.findById = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msg = errors.array().map(e=>e.msg).join(' - ')
        return res.status(400).json({ error: msg });
    }
    const id = req.params.id;
    Category.findByPk(id)
        .then(data => {
            if (data) {
                // console.log(data)
                res.status(200).json({ message: "Find Category", data })
            } else {
                res.status(500).send({
                    message: `Cannot find category with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving category with id=" + id
            });
        });
}

exports.create = (req, res) => {
    //valider formulaire
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msg = errors.array().map(e=>e.msg).join(' - ')
        return res.status(400).json({ error: msg });
    }
    //recuperer le body nettoyé par express validator
    const cleanedBody = matchedData(req);
    const { title, description, img,  background, top, status } = cleanedBody
    Category.create(
        { title, description, img, background, top, status }
    ).then((data) => {
        res.status(201).json({ message: `Catégorie créée`, data:data.dataValues });
    }).catch(err => {
        res.status(500).send({ message: "Erreur lors de la création de la catégorie" });
    });
}

exports.delete = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msg = errors.array().map(e=>e.msg).join(' - ')
        return res.status(400).json({ error: msg });
    }
    const id = req.params.id;
    Category.destroy(
        { where:{id} }
    ).then((data) => {
        res.status(204).send({ message: `Catégorie #${id} supprimée`});
    }).catch(err => {
        res.status(500).send({ message: "Erreur lors de la suppression de la catégorie" });
    });
}

exports.update = (req, res) => {
    //valider formulaire
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msg = errors.array().map(e=>e.msg).join(' - ')
        return res.status(400).json({ error: msg });
    }
    //recuperer le body nettoyé par express validator
    const cleanedBody = matchedData(req);
    const { title, description, img,  background, top, status } = cleanedBody
    const id = req.params.id;

    Category.update(
        { title, description, img, background, top, status },
        { where: { id } }
    ).then(() => {
        res.status(200).send({ message: `Produit mis à jour` });
    }).catch(err => {
        res.status(500).send({ message: "Erreur modification" });
    });
}

exports.findAllDetails = (req, res) => {
    /*SELECT * FROM categories c JOIN (SELECT COUNT(*) AS 'nb_products', category_id FROM products GROUP BY category_id) n ON n.category_id=c.id*/
    Category.findAll({
        attributes: { include: [[literal(`(SELECT COUNT(*) FROM products WHERE products.category_id = Category.id)`), "nb_products"]] },
        })
        .then(data => {
            if(data.length===0)
                res.status(204).send('no data')
            else
                res.status(200).json({ data })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error Database."
            });
        });
};


