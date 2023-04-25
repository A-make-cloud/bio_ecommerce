const express = require('express')
const router = express.Router();
const CommandeController = require('../../src/controllers/CommandeController.js')
const Commande = new CommandeController()
router.get("/list", (req, res) => {
    const list = [{ id: 1, name: "commande" }];
    res.json(list)
});
router.post("/create", (req, res) => {

});
router.get("/find/:id", (req, res) => {

});
router.get("/new", (req, res) => {

});


module.exports = router;