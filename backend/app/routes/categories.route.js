const express = require('express')
const router = express.Router();
const Controller = require('../../src/controllers/CategoryController.js')

//find all categories
router.get("/findAll", Controller.findAll);
//create  form category
router.get("/create", Controller.create);
//find category by id
router.get("/find/:id", Controller.findById);

module.exports = router;

