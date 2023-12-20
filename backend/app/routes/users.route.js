const express = require('express')
const router = express.Router();
const Controller = require('../../src/controllers/UserController.js')
const authController = require('../../src/controllers/AuthenticationController')
const registerController = require('../../src/controllers/RegisterController')
const {tokenVerif, adminVerif} = require('../../src/middelwares/middelwareAuth.js')
const {cleanUserForm, cleanUpdateUser} = require('../../src/middelwares/sanitizeValidate.js')
const { param } = require('express-validator');

//--------------login user
router.post("/login", authController.process);
//--------------delete JWT cookie when unlogin
router.delete("/delete-cookie", authController.deletecookie);
//--------------register new user
router.post("/register", cleanUserForm, registerController.process);
//find all user
router.get("/find-all", adminVerif, Controller.findAll);
//find user itself via token
router.get("/find-self", tokenVerif, Controller.findSelf);
//find user by id
//router.get("/find/:id", adminVerif, Controller.findById);
//find user by email
//router.get("/findByEmail/:email", adminVerif, Controller.findByEmail);
//update user
router.put("/update", tokenVerif, cleanUpdateUser, Controller.update);
//delete user by admin
router.delete("/delete/:id", adminVerif, param("id").isInt().escape(), Controller.delete);

module.exports = router;
