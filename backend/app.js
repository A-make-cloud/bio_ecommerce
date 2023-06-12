const express = require('express')
const app = express()
const path = require("path");
const cookieParser = require('cookie-parser');
//variable d'environnement
require("dotenv").config();

app.use(cookieParser());

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

//----------------routes addresses
const addressesRoutes = require('./app/routes/addresses.route.js')
app.use("/addresses", addressesRoutes);

//----------------routes autres pour admin
const adminRoutes = require('./app/routes/admin.route.js')
app.use("/admin", adminRoutes);

//*/
console.log('----------prod-----', process.env.NODE_ENV)
// Serve frontend
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));

    app.get("*", (req, res) =>
        res.sendFile(
            path.resolve(__dirname, "../", "frontend", "build", "index.html")
        )
    );
} else {
    app.get("/", (req, res) => res.send("Please set to production"));
}

module.exports = app;
