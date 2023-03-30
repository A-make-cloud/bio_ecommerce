const jwt = require('jsonwebtoken');

exports.tokenVerif = (req, res, next) => {


    console.log('-----------------body update', req.body)
    console.log('-----------------body update', req.headers['authorization'])
    const auth_form = req.headers['authorization'];
    const token_access = auth_form && auth_form.split(' ')[1];
    console.log("token_access-------------", token_access)
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