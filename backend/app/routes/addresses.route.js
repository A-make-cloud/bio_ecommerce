const express = require('express')
const router = express.Router();
const Controller = require('../../src/controllers/AddressController.js')
const { tokenVerif, adminVerif } = require('../../src/middelwares/middelwareAuth.js')
const { cleanAddressForm } = require('../../src/middelwares/sanitizeValidate.js')
const { param } = require('express-validator');

//addresses of the user via his token
router.get("/addresses", tokenVerif, Controller.getAddresses);
//modify an address 
router.put("/update-address", tokenVerif, cleanAddressForm, Controller.updateAddress);
//create an address
router.post("/create-address", tokenVerif, cleanAddressForm, Controller.createAddress);

module.exports = router;
