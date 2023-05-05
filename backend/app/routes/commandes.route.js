const express = require('express')
const router = express.Router();
const Controller = require('../../src/controllers/CommandeController.js')
const middelwareAuth = require('../../src/middelwares/middelwareAuth.js')
//const Commande = new CommandeController()
router.get("/list", (req, res) => {
    const list = [{ id: 1, name: "commande" }];
    res.json(list)
});

//list of orders of one user with the addresses
router.get("/my-orders", middelwareAuth.tokenVerif, Controller.myOrders);

router.post("/create", (req, res) => {});

//details of one order with list of "CommandLine" 
router.get("/order-details/:id", middelwareAuth.tokenVerif, Controller.lineDetails);

//addresses of the user via his token
router.get("/addresses", middelwareAuth.tokenVerif, Controller.getAddresses);
//modify an address 
router.put("/update-address", middelwareAuth.tokenVerif, Controller.updateAddress);
//create an address
router.post("/create-address", middelwareAuth.adminVerif, Controller.createAddress);
//list of the orders for the admins
router.get("/orders", middelwareAuth.adminVerif, Controller.adminOrders);
//Details of one order for the admins
router.get("/admin-order/:id", middelwareAuth.adminVerif, Controller.adminOrderDetails);
//Update the progress and notes on an order by an admin
router.put("/admin-order/update/:id", middelwareAuth.adminVerif, Controller.adminOrderProgress);

module.exports = router;
