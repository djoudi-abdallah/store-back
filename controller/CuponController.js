const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new coupon
exports.createCoupon = async (req, res) => {
  try {
    const { code, percentage, amount, expiration } = req.body;
    const coupon = await prisma.coupon.create({
      data: {
        code,
        percentage,
        amount,
        expiration,
      },
    });
    res.json(coupon);
  } catch (error) {
    res.status(500).json({ error: "Unable to create a coupon." });
  }
};

// Get all coupons
exports.getAllCoupons = async (req, res) => {
  try {
    const coupons = await prisma.coupon.findMany();
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch coupons." });
  }
};

// Get a coupon by ID
exports.getCouponById = async (req, res) => {
  try {
    const couponId = parseInt(req.params.id);
    const coupon = await prisma.coupon.findUnique({
      where: { id: couponId },
    });
    if (!coupon) {
      res.status(404).json({ error: "Coupon not found." });
    } else {
      res.json(coupon);
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch the coupon." });
  }
};

// Update a coupon by ID
exports.updateCouponById = async (req, res) => {
  try {
    const couponId = parseInt(req.params.id);
    const { code, percentage, amount, expiration } = req.body;
    const updatedCoupon = await prisma.coupon.update({
      where: { id: couponId },
      data: {
        code,
        percentage,
        amount,
        expiration,
      },
    });
    res.json(updatedCoupon);
  } catch (error) {
    res.status(500).json({ error: "Unable to update the coupon." });
  }
};

// Delete a coupon by ID
exports.deleteCouponById = async (req, res) => {
  try {
    const couponId = parseInt(req.params.id);
    await prisma.coupon.delete({
      where: { id: couponId },
    });
    res.json({ message: "Coupon deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete the coupon." });
  }
};
