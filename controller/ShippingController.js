const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new shipping
exports.createShipping = async (req, res) => {
  try {
    const { status, orderId, templateId } = req.body;
    const shipping = await prisma.shipping.create({
      data: {
        status,
        orderId,
        templateId,
      },
    });
    res.json(shipping);
  } catch (error) {
    res.status(500).json({ error: "Unable to create a shipping." });
  }
};

// Get all shippings
exports.getAllShippings = async (req, res) => {
  try {
    const shippings = await prisma.shipping.findMany();
    res.json(shippings);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch shippings." });
  }
};

// Get a shipping by ID
exports.getShippingById = async (req, res) => {
  try {
    const shippingId = parseInt(req.params.id);
    const shipping = await prisma.shipping.findUnique({
      where: { id: shippingId },
    });
    if (!shipping) {
      res.status(404).json({ error: "Shipping not found." });
    } else {
      res.json(shipping);
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch the shipping." });
  }
};

// Update a shipping by ID
exports.updateShippingById = async (req, res) => {
  try {
    const shippingId = parseInt(req.params.id);
    const { status, orderId, templateId } = req.body;
    const updatedShipping = await prisma.shipping.update({
      where: { id: shippingId },
      data: {
        status,
        orderId,
        templateId,
      },
    });
    res.json(updatedShipping);
  } catch (error) {
    res.status(500).json({ error: "Unable to update the shipping." });
  }
};

// Delete a shipping by ID
exports.deleteShippingById = async (req, res) => {
  try {
    const shippingId = parseInt(req.params.id);
    await prisma.shipping.delete({
      where: { id: shippingId },
    });
    res.json({ message: "Shipping deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete the shipping." });
  }
};
