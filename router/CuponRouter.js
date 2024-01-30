const express = require("express");
const router = express.Router();
const cuponrouter = require("../controller/CuponController");
const adminMiddleware = require("../middleware/adminMiddleware");

// Create a new coupon
router.post("/", adminMiddleware, cuponrouter.createCoupon);

// Get all coupons
router.get("/", adminMiddleware, cuponrouter.getAllCoupons);

// Get a coupon by ID
router.get("/:id", adminMiddleware, cuponrouter.getCouponById);

// Update a coupon by ID
router.put("/:id", adminMiddleware, cuponrouter.updateCouponById);

// Delete a coupon by ID
router.delete("/:id", adminMiddleware, cuponrouter.deleteCouponById);

module.exports = router;
