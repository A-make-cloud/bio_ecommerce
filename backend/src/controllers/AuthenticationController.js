//const UserRepo = require('../repository/UsersRepository.js');
const jwt = require('jsonwebtoken');
const Cookies = require( "cookies" );
require('dotenv').config();
//const UserController = require('./UserController');
const { User } = require('../../models');

exports.process = (req, res) => {
    console.log('req.session.user ', req.session.user)
    if(req.session.user) {
        //déjà connecté
        return res.status(200);
    }

    const email = req.body.email;
    //UserController.findByEmail(req.body.email).then((user) => {
    User.findOne({ where: { email } }).then(data=>{
        
        if (data === null){
            res.status(401).json({ error: "user not found" })
            return
        }
        let user = data.dataValues
        const bcrypt = require('bcryptjs');
        //console.log('verifier request.body.password et user.password : ', request.body.password,' - ',user.password, )
        if(bcrypt.compareSync(req.body.password, user.password)) {
            // création du JWT pour cet user
            let accessToken = jwt.sign({id: user.id, firstname: user.firstname, lastname : user.lastname, profil: user.profil}, process.env.SECRET_JWT, {expiresIn: 604800});       
            new Cookies(req,res).set('access_token', accessToken, {httpOnly: true, secure: false });

            //console.log('cookie just créé : ',new Cookies(request,response).get('access_token'))
            // maintenant authentifié
            return res.status('200').json({ message: "user connected", id: user.id, firstname:user.firstname, lastname:user.lastname });
        } else {
            //Erreur d'identification
            res.status(401).json({ error: "wrong password" })
        }
    }).catch((err) => {
        console.log(err)
        //Erreur d'identification
        res.status(401).json({ error: "Error connexion" })
    });
}

exports.disconnect = (req, res) => {
    delete req.session.user;
    res.status(200).json({ message: "user logged out", id: user.id })
    //renvoyer une réponse ?
}
