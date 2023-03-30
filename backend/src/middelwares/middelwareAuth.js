const jwt = require('jsonwebtoken');

exports.tokenVerif = (req, res, next) => {

    const auth_form = req.headers['authorization'];
    const token_access = auth_form && auth_form.split(' ')[1];

    if (token_access == null) {
        res.status(401).send({
            message: "Token introuvable !"
        });
    }
    //-------------verifier le token access
    jwt.verify(token_access, process.env.SECRET_JWT, (err, user) => {
        if (err) {
            return res.sendStatus(403).send({
                message: "Token invalide !"
            });
        }
        req.user = user;

        next();
    });
}