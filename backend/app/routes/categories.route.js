const express = require('express')
const router = express.Router();
const Controller = require('../../src/controllers/CategoryController.js')
const middelwareAuth = require('../../src/middelwares/middelwareAuth.js')
//find all categories
router.get("/find-all", Controller.findAll);
//create category
router.post("/create", middelwareAuth.adminVerif, Controller.create);
//delete category
router.get("/delete/:id", middelwareAuth.adminVerif, Controller.delete);
//update category
router.put("/update/:id", middelwareAuth.adminVerif, Controller.update);
//find category by id
router.get("/find/:id", Controller.findById);
//find all categories with extra details for admin
router.get("/find-all-details", middelwareAuth.adminVerif, Controller.findAllDetails);
module.exports = router;
