const { Category } = require('../../models');

exports.findAll = (req, res) => {
    Category.findAll()
        .then(data => {
            res.status(201).json({ data })
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

    Category.findByPk(id)
        .then(data => {
            if (data) {
                console.log(data)
                res.status(201).json({ message: "Find Category", data })
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
    //1---------------recuperer le body ==>>TODO
    //2----------------valider form ==>>TODO
    //3---------------------Ajouter category  ==>>OK



    //3---------------------Ajouter ==>>OK
    const element = {
        title: 'titre',
        description: 'description',
        img: 'image url',
        background: "red",
        top: 1,

    }
    Category.create(element).then((category) => {
        res.status(201).json({ message: "Created Category", category })
    }).catch(err => {
        res.status(500).json({ error: err.message || "Error Database." })
    })


}