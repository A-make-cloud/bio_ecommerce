const express = require('express')
const router = express.Router();
const Controller = require('../../src/controllers/ProductController.js')
const middelwareAuth = require('../../src/middelwares/middelwareAuth.js')
//find all products on sale
router.get("/find-all", Controller.findAllActive);
//find all products, even those desactivated
router.get("/admin-find-all", middelwareAuth.adminVerif, Controller.findAll);
//find by categories
router.get("/findByCategory", Controller.findByCategory);
//create  form product
router.post("/create",  Controller.create);
//find product by id
router.get("/find/:id", Controller.findById);
//find top products with limit in querry string : ...path?limit=10
router.get("/find-top", Controller.findTop);
module.exports = router;
