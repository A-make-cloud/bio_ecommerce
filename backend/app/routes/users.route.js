const express = require('express')
const router = express.Router();
const UserController = require('../../src/controllers/UserController.js')
const User = new UserController()
router.get("/list", (req, res) => {
    const list = User.list()
    res.json(list)
});
router.post("/create", (req, res) => {

});
router.get("/find/:id", (req, res) => {


});



module.exports = router;