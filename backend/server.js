const express = require('express')
const app = express()
const PORT = process.env.APP_ENV || 9000

const cookieParser = require('cookie-parser');
//variable d'environnement
require("dotenv").config();

// parse requests of content-type - application/json
app.use(express.json());

// const session = require('express-session');
//----------------------ajout de express session (dj)
// app.use(session({
//     //todo: utiliser un process.env.APP_KEY à la place de 'e8dec954ad98d87d249b22268df6109469417ddd'
//     secret: process.env.APP_KEY, resave: false, saveUninitialized: false,
//     cookie: { maxAge: 3600000 }
// }));

//---------------cookie parser 29/03
app.use(cookieParser());

//------------------lancer le serveur sur le port 
app.listen(PORT, () => {
    if (process.env.APP_ENV == "dev" && process.send) {
        process.send("online");
    }
    console.log(`Le serveur est démarré : http://localhost:${PORT}`);
});


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
