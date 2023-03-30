const express = require('express')
const router = express.Router();
const Controller = require('../../src/controllers/UserController.js')
const authController = require('../../src/controllers/AuthenticationController')
const registerController = require('../../src/controllers/RegisterController')
const middelwareAuth = require('../../src/middelwares/middelwareAuth.js')
//--------------login user
router.post("/login", authController.process);
//--------------register new user 
router.post("/register", registerController.process);
//find all user
router.get("/findAll", Controller.findAll);
//create  form user by admin
router.get("/create", Controller.create);
//find user by id
router.get("/find/:id", Controller.findById);
//find user by email
router.get("/findByEmail/:email", Controller.findByEmail);
//update user 
router.put("/update", middelwareAuth.tokenVerif, Controller.update);
module.exports = router;
