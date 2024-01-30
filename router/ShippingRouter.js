const express = require("express");
const router = express.Router();
const shippingcontroller = require("../controller/ShippingController");

// Create a new shipping
router.post("/", shippingcontroller.createShipping);

// Get all shippings
router.get("/", shippingcontroller.getAllShippings);

// Get a shipping by ID
router.get("/:id", shippingcontroller.getShippingById);

// Update a shipping by ID
router.put("/:id", shippingcontroller.updateShippingById);

// Delete a shipping by ID
router.delete("/:id", shippingcontroller.deleteShippingById);

module.exports = router;
