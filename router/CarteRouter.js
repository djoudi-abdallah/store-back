const express = require("express");
const router = express.Router();
const cartecontroller = require("../controller/CarteController");
const authMiddleware = require("../middleware/authMiddleware");

// Create a new cart
router.post("/", authMiddleware, cartecontroller.createCart);

// Get all carts
router.get("/", authMiddleware, cartecontroller.getAllCarts);

// Get a cart by ID
router.get("/:id", authMiddleware, cartecontroller.getCartById);

// Update a cart by ID
router.put("/:id", authMiddleware, cartecontroller.updateCartById);

// Delete a cart by ID
router.delete("/:id", authMiddleware, cartecontroller.deleteCartById);

module.exports = router;
