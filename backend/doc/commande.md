### pour initialiser un fichier package.json

npm init

### installer express

npm install express

### installer nodemon pour redémarrer automatiquement les processus

npm install nodemon --save-dev

### installer dotenv pour les variables d'environnement

npm i dotenv

### installer joi validation form

# https://joi.dev/api/?v=17.8.3

npm i joi

### installer sequelize https://sequelize.org/

npm install sequelize sequelize-auto sequelize-cli mysql mysql2 --save
npx sequelize-cli init

Cette commande crée 4 dossiers:
models
le fichier models/index.js
config
le fichier config/config.json
migrations
seeders

//----- creer une db
npx sequelize-cli db:create
//----- creer un model
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string
// -----generer une migration
npx sequelize-cli migration:generate --name create-user

### installer bcrypt password

npm i bcrypt

//---------se
npx sequelize migration:generate --name create-users --models-path models --name User

//-----migration et creation de la table
npx sequelize-cli db:migrate
//pour annuler une migration
npx sequelize-cli db:migrate:undo
//pour annuler tous les migrations
npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:migrate

###### ### ### ### ### ### ### ### ### coté front end

npm i react-router-dom@6

### installer react app

npx create-react-app frontend

//-----------------create table

## Category

npx sequelize-cli model:generate --name Category --attributes title:string,description:text,status:enum(1,2),image:string,top:integer

## product

npx sequelize-cli model:generate --name Product --attributes title:string,description:text,
price_ht:decimal,tva:decimal,quantity:integer,status:enum,top:integer
npx sequelize-cli model:generate --name Image --attributes title:string
npx sequelize-cli model:generate --name Category --attributes title:string

### ----------------Pour Agnès et David

##l--creer la table bioshop
npx sequelize-cli db:create

## 2----lancer la creation des tables

npx sequelize-cli db:migrate

## 3----crréer un seeder pour ajouter un compte admin

npx sequelize-cli seed:generate --name admin-user

## 5----modifier le fichier dans seeders/ -admin-user.js et modifier le password

## 4----seeder les données

npx sequelize-cli db:seed:all
