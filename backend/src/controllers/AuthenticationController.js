const UserRepo = require('../repository/UsersRepository.js');
const jwt = require('jsonwebtoken');
const Cookies = require( "cookies" );
require('dotenv').config();
const { User } = require('../../models');

exports.process = (req, res) => {
    console.log('req.session.user ',req.session.user)
    





}

exports.disconnect = (req, res) => {
    delete req.session.user;
    //renvoyer une réponse ?
}
