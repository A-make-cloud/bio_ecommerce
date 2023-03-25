const express = require('express')
const app = express()
const PORT = process.env.APP_ENV || 9000
//variable d'environnement
require("dotenv").config();

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
