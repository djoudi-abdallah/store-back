const express = require("express");
const router = express.Router();
const otherdetailscontroller = require("../controller/OrderDetailesController");

// Create a new order detail
router.post("/", otherdetailscontroller.createOrderDetail);

// Get all order details
router.get("/", otherdetailscontroller.getAllOrderDetails);

// Get an order detail by ID
router.get("/:id", otherdetailscontroller.getOrderDetailById);

// Update an order detail by ID
router.put("/:id", otherdetailscontroller.updateOrderDetailById);

// Delete an order detail by ID
router.delete("/:id", otherdetailscontroller.deleteOrderDetailById);

module.exports = router;
