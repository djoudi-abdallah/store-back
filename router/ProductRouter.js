const express = require("express");
const router = express.Router();
const productcontroller = require("../controller/ProductController");
const adminMiddleware = require("../middleware/adminMiddleware");

// Create a new product
router.post("/", adminMiddleware, productcontroller.createProduct);

// Get all products
router.get("/", productcontroller.getAllProducts);

// Get a product by ID
router.get("/:id", productcontroller.getProductById);

// Update a product by ID
router.put("/:id", adminMiddleware, productcontroller.updateProductById);

// Delete a product by ID
router.delete("/:id", adminMiddleware, productcontroller.deleteProductById);

module.exports = router;
