const express = require('express')
const router = express.Router();
const Controller = require('../../src/controllers/ProductController.js')
const { adminVerif } = require('../../src/middelwares/middelwareAuth.js')
const { cleanProductForm, cleanQueryFindall } = require('../../src/middelwares/sanitizeValidate.js')
const { param } = require('express-validator');

//find all products on sale
router.get("/find-all", cleanQueryFindall, Controller.findAllActive);
//find all products, even those desactivated
router.get("/admin-find-all", adminVerif, cleanQueryFindall, Controller.findAll);
//find by categories
//router.get("/find-by-category", Controller.findByCategory);
//create  form product
router.post("/create", adminVerif, cleanProductForm, Controller.create);
//find product by id
router.get("/find/:id", param("id").isInt().escape(), Controller.findById);
//find top products with limit in querry string : ...path?limit=10
router.get("/find-top", Controller.findTop);
//update a product as an admin
router.put("/update/:id", adminVerif, param("id").isInt().escape(), cleanProductForm, Controller.update);
module.exports = router;
