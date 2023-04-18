const express = require('express')
const router = express.Router();
const Controller = require('../../src/controllers/UserController.js')
const authController = require('../../src/controllers/AuthenticationController')
const registerController = require('../../src/controllers/RegisterController')
const middelwareAuth = require('../../src/middelwares/middelwareAuth.js')
//--------------login user
router.post("/login", authController.process);
//--------------delete JWT cookie when unlogin
router.delete("/delete-cookie", authController.deletecookie);
//--------------register new user 
router.post("/register", registerController.process);
//find all user
router.get("/findAll", middelwareAuth.adminVerif, Controller.findAll);
//create  form user by admin
router.get("/create", middelwareAuth.adminVerif, Controller.create);
//find user itself via token
router.get("/find-self", middelwareAuth.tokenVerif, Controller.findSelf);
//find user by id
router.get("/find/:id", middelwareAuth.adminVerif, Controller.findById);
//find user by email
router.get("/findByEmail/:email", middelwareAuth.adminVerif, Controller.findByEmail);
//update user. route pas encore utilisé coté front, comme beaucoup des précedentes
router.put("/update", middelwareAuth.tokenVerif, Controller.update);
module.exports = router;
