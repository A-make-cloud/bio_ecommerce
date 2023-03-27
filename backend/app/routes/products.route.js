const express = require('express')
const router = express.Router();
const Controller = require('../../src/controllers/ProductController.js')
//find all products
router.get("/findAll", Controller.findAll);
//find by categories
router.get("/findByCategory/:category_id", Controller.findByCategory);
//create  form product
router.get("/create/:category_id", Controller.create);
//find product by id
router.get("/find/:id", Controller.findById);

module.exports = router;
