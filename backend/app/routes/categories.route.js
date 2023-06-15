const express = require('express')
const router = express.Router();
const Controller = require('../../src/controllers/CategoryController.js')
const { adminVerif } = require('../../src/middelwares/middelwareAuth.js')
const { cleanCatergoriesForm } = require('../../src/middelwares/sanitizeValidate.js')
const { param } = require('express-validator');

//find all categories
router.get("/find-all", Controller.findAll);
//create category
router.post("/create", adminVerif, cleanCatergoriesForm, Controller.create);
//delete category
router.delete("/delete/:id", adminVerif, param("id").isInt().escape(), Controller.delete);
//update category
router.put("/update/:id", adminVerif, param("id").isInt().escape(), cleanCatergoriesForm, Controller.update);
//find category by id
router.get("/find/:id", param("id").isInt().escape(), Controller.findById);
//find all categories with extra details for admin
router.get("/find-all-details", adminVerif, Controller.findAllDetails);
module.exports = router;
