
const { User } = require('../../models');

exports.findAll = (req, res) => {
    User.findAll()
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

exports.register = (req, res) => {
    //1---------------recuperer le body ==>>TODO
    //2----------------valider form ==>>TODO
    //3---------------------Ajouter user  ==>>OK
    //4------------------Envoyer le mail de validation   ==>>TODO


    //3---------------------Ajouter ==>>OK
    const element = {
        civility: 'M',
        firstName: 'Bela',
        lastName: 'Sam',
        profil: 'admin',
        email: 's1@gmail.com',
        password: 'password123',
        token: 'pdasswfrd123',
    }

    User.create(element).then((user) => {
        res.status(201).json({ message: "Created user", user })
    }).catch(err => {
        res.status(500).json({ error: err.message || "Error Database." })
    })


}



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

