const express = require('express')
const app = express()
const PORT = process.env.APP_ENV || 9000
const jwt = require('jsonwebtoken');
const Cookies = require( "cookies" );
const session = require('express-session');
//variable d'environnement
require("dotenv").config();


//----------------------ajout de express session (dj)
app.use(session({
    //todo: utiliser un process.env.APP_KEY à la place de 'e8dec954ad98d87d249b22268df6109469417ddd'
    secret: process.env.APP_KEY, resave:false, saveUninitialized:false, 
    cookie: {maxAge: 3600000} 
}));
//------------------------ JWT -------------------------
app.use((req, res, next)=>{

    // Récupération du token dans le cookie
    let token = new Cookies(req,res).get('access_token');
    console.log('Récupération du token dans le cookie : ',token)
    // Si le cookie (access_token) existe
    if (typeof token != 'undefined'){

        // on vérifie le jwt
        jwt.verify(token, process.env.SECRET_JWT, (err, dataJwt) => { 
            // Erreur du JWT (n'est pas un JWT, a été modifié, est expiré)
            if(err) {
                res.clearCookie('access_token')
                delete req.session.user
                //-> revenvoyer un 404 ou 401 ?
                next();
            };

            // A partir de là le JWT est valide on a plus qu'à vérifier les droits
            // Si on est admin
            //if(typeof dataJwt.roles != 'undefined' && dataJwt.roles[0] == 'admin') {
                //return res.send(`Admin ${dataJwt.firstname}`);
                req.session.user = { id: dataJwt.id, firstname: dataJwt.firstname, lastname : dataJwt.lastname, role : dataJwt.role };
                res.locals.session=req.session
            /*
            } 
            else {
                // si on n'est pas admin
                return res.send(`${dataJwt.firstname} PAS ADMIN !!!!`);
            }*/
        });
    }
    next()
})


//------------------lancer le serveur sur le port 
app.listen(PORT, () => {
    if (process.env.APP_ENV == "dev" && process.send) {
        process.send("online");
    }
    console.log(`Le serveur est démarré : http://localhost:${PORT}`);
});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
//------------------------//------------------------//------------------------
//------------------------Chargement des routes//------------------------
//------------------------//------------------------//------------------------


//----------------routes categories
const categoriesRoutes = require('./app/routes/categories.route.js')
app.use("/categories", categoriesRoutes);
//----------------routes products
//*
const productsRoutes = require('./app/routes/products.route.js')
app.use("/products", productsRoutes);

//----------------routes users
const usersRoutes = require('./app/routes/users.route.js')
app.use("/users", usersRoutes);

//----------------routes commandes
const commandesRoutes = require('./app/routes/commandes.route.js')
app.use("/commandes", commandesRoutes);
//*/
