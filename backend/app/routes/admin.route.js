const express = require('express')
const router = express.Router();
const Controller = require('../../src/controllers/AdminController.js')
const middelwareAuth = require('../../src/middelwares/middelwareAuth.js')
//find all kind of details to provide an overview for the administrators
router.get("/summary", /*middelwareAuth.adminVerif,*/ Controller.summary);
module.exports = router;
