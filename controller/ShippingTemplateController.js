const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new shipping template
exports.createShippingTemplate = async (req, res) => {
  try {
    const { address, cost, duration, description } = req.body;
    const shippingTemplate = await prisma.shippingTemplate.create({
      data: {
        address,
        cost,
        duration,
        description,
      },
    });
    res.json(shippingTemplate);
  } catch (error) {
    res.status(500).json({ error: "Unable to create a shipping template." });
  }
};

// Get all shipping templates
exports.getAllShippingTemplates = async (req, res) => {
  try {
    const shippingTemplates = await prisma.shippingTemplate.findMany();
    res.json(shippingTemplates);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch shipping templates." });
  }
};

// Get a shipping template by ID
exports.getShippingTemplateById = async (req, res) => {
  try {
    const shippingTemplateId = parseInt(req.params.id);
    const shippingTemplate = await prisma.shippingTemplate.findUnique({
      where: { id: shippingTemplateId },
    });
    if (!shippingTemplate) {
      res.status(404).json({ error: "Shipping template not found." });
    } else {
      res.json(shippingTemplate);
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch the shipping template." });
  }
};

// Update a shipping template by ID
exports.updateShippingTemplateById = async (req, res) => {
  try {
    const shippingTemplateId = parseInt(req.params.id);
    const { address, cost, duration, description } = req.body;
    const updatedShippingTemplate = await prisma.shippingTemplate.update({
      where: { id: shippingTemplateId },
      data: {
        address,
        cost,
        duration,
        description,
      },
    });
    res.json(updatedShippingTemplate);
  } catch (error) {
    res.status(500).json({ error: "Unable to update the shipping template." });
  }
};

// Delete a shipping template by ID
exports.deleteShippingTemplateById = async (req, res) => {
  try {
    const shippingTemplateId = parseInt(req.params.id);
    await prisma.shippingTemplate.delete({
      where: { id: shippingTemplateId },
    });
    res.json({ message: "Shipping template deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete the shipping template." });
  }
};
