const express = require('express')
const router = express.Router();
const CategoryController = require('../../src/controllers/CategoryController.js')
const Category = new CategoryController()
router.get("/list", (req, res) => {
    const list = [{ id: 1, name: "cat 1" }];
    res.json(list)
});
router.post("/create", (req, res) => {

});
router.get("/find/:id", (req, res) => {

});



module.exports = router;