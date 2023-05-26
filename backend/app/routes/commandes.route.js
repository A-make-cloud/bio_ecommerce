const express = require('express')
const router = express.Router();
const Controller = require('../../src/controllers/CommandeController.js')
const { tokenVerif, adminVerif } = require('../../src/middelwares/middelwareAuth.js')
const { cleanOrderUpdate, cleanOrderForm } = require('../../src/middelwares/sanitizeValidate.js')
const { param } = require('express-validator');

//list of orders of one user with the addresses
router.get("/my-orders", tokenVerif, Controller.myOrders);
//create an order and confirm it if payment is accepted with Stripe
router.post("/place-order", tokenVerif, cleanOrderForm, Controller.placeOrder);
//details of one order with list of "CommandLine" 
router.get("/order-details/:id", tokenVerif, param("id").isInt().escape(), Controller.lineDetails);
//list of the orders for the admins
router.get("/orders", adminVerif, Controller.adminOrders);
//Details of one order for the admins
router.get("/admin-order/:id", adminVerif, param("id").isInt().escape(), Controller.adminOrderDetails);
//Update the progress and notes on an order by an admin
router.put("/admin-order/update/:id", adminVerif, param("id").isInt().escape(), cleanOrderUpdate, Controller.adminOrderProgress);


module.exports = router;
