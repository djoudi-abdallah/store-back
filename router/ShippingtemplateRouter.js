const express = require("express");
const router = express.Router();
const shippingtemplatecontroller = require("../controller/ShippingTemplateController");

// Create a new shipping template
router.post("/", shippingtemplatecontroller.createShippingTemplate);

// Get all shipping templates
router.get("/", shippingtemplatecontroller.getAllShippingTemplates);

// Get a shipping template by ID
router.get("/:id", shippingtemplatecontroller.getShippingTemplateById);

// Update a shipping template by ID
router.put("/:id", shippingtemplatecontroller.updateShippingTemplateById);

// Delete a shipping template by ID
router.delete("/:id", shippingtemplatecontroller.deleteShippingTemplateById);

module.exports = router;
