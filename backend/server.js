const express = require('express')
const app = express()
const PORT = process.env.APP_ENV || 5000
//variable d'environnement
require("dotenv").config();

//------------------lancer le serveur sur le port 
app.listen(PORT, () => {
    if (process.env.APP_ENV == "dev" && process.send) {
        process.send("online");
    }
    console.log(`Le serveur est démarré : http://localhost:${PORT}`);
});

//------------------------//------------------------//------------------------
//------------------------Chargement des routes//------------------------
//------------------------//------------------------//------------------------
//----------------routes users
const usersRoutes = require('./app/routes/users.route.js')
app.use("/users", usersRoutes);
//----------------routes categories
const categoriesRoutes = require('./app/routes/categories.route.js')
app.use("/categories", categoriesRoutes);
//----------------routes products
const productsRoutes = require('./app/routes/products.route.js')
app.use("/products", productsRoutes);
//----------------routes commandes
const commandesRoutes = require('./app/routes/commandes.route.js')
app.use("/commandes", commandesRoutes);


//-----------------

const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.SQL_DBNAME, process.env.SQL_USER, process.env.SQL_PASSWORD, {
    host: process.env.SQL_HOST,
    dialect: 'mysql',
    port: process.env.SQL_PORT,
});
console.log(sequelize)

class User extends Model { }
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
}, {
    sequelize,
    modelName: 'user'
});