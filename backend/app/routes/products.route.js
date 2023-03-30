const express = require('express')
const router = express.Router();
const Controller = require('../../src/controllers/ProductController.js')
//find all products
router.get("/findAll", Controller.findAll);
//find by categories
router.get("/findByCategory", Controller.findByCategory);
//create  form product
router.post("/create", Controller.create);
//find product by id
router.get("/find/:id", Controller.findById);
//find top products with limit in querry string : ...path?limit=10
router.get("/find-top", Controller.findById);

module.exports = router;
