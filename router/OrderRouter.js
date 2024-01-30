const express = require("express");
const router = express.Router();
const ordercontroller = require("../controller/OrderController");
const authMiddleware = require("../middleware/authMiddleware");

// Create a new order
router.post("/", authMiddleware, ordercontroller.createOrder);

// Get all orders
router.get("/", authMiddleware, ordercontroller.getAllOrders);

// Get an order by ID
router.get("/:id", authMiddleware, ordercontroller.getOrderById);

// Update an order by ID
router.put("/:id", authMiddleware, ordercontroller.updateOrderById);

// Delete an order by ID
router.delete("/:id", authMiddleware, ordercontroller.deleteOrderById);

module.exports = router;
