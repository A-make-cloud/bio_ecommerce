const express = require('express')
const router = express.Router();
const ProductController = require('../../src/controllers/ProductController.js')
const Product = new ProductController()

router.get("/list", (req, res) => {
    const list = [{ id: 1, title: "product 1" }, { id: 2, title: "product 2" }];
    res.json(list)
});
router.post("/create", (req, res) => {
    //traitement formulaire 
    //enregister dans la base

});
router.get("/find/:id", (req, res) => {

});



module.exports = router;