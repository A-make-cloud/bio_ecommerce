const express = require('express')
const router = express.Router();
const Controller = require('../../src/controllers/UserController.js')
const authController = require('../../src/controllers/AuthenticationController')

//login
router.post("/login", authController.process);
//find all user
router.get("/findAll", Controller.findAll);
//register  form user
router.get("/register", Controller.register);
//find user by id
router.get("/find/:id", Controller.findById);
//find user by email
router.get("/findByEmail/:email", Controller.findByEmail);
module.exports = router;