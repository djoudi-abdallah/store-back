const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new order detail
exports.createOrderDetail = async (req, res) => {
  try {
    const { orderId, productId, quantity, unitPrice } = req.body;
    const orderDetail = await prisma.orderDetail.create({
      data: {
        orderIdd: orderId, // Correct the typo in the column name
        productId,
        quantity,
        unitPrice,
      },
    });
    res.json(orderDetail);
  } catch (error) {
    res.status(500).json({ error: "Unable to create an order detail." });
  }
};

// Get all order details
exports.getAllOrderDetails = async (req, res) => {
  try {
    const orderDetails = await prisma.orderDetail.findMany();
    res.json(orderDetails);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch order details." });
  }
};

// Get an order detail by ID
exports.getOrderDetailById = async (req, res) => {
  try {
    const orderDetailId = parseInt(req.params.id);
    const orderDetail = await prisma.orderDetail.findUnique({
      where: { id: orderDetailId },
    });
    if (!orderDetail) {
      res.status(404).json({ error: "Order detail not found." });
    } else {
      res.json(orderDetail);
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch the order detail." });
  }
};

// Update an order detail by ID
exports.updateOrderDetailById = async (req, res) => {
  try {
    const orderDetailId = parseInt(req.params.id);
    const { orderId, productId, quantity, unitPrice } = req.body;
    const updatedOrderDetail = await prisma.orderDetail.update({
      where: { id: orderDetailId },
      data: {
        orderIdd: orderId, // Correct the typo in the column name
        productId,
        quantity,
        unitPrice,
      },
    });
    res.json(updatedOrderDetail);
  } catch (error) {
    res.status(500).json({ error: "Unable to update the order detail." });
  }
};

// Delete an order detail by ID
exports.deleteOrderDetailById = async (req, res) => {
  try {
    const orderDetailId = parseInt(req.params.id);
    await prisma.orderDetail.delete({
      where: { id: orderDetailId },
    });
    res.json({ message: "Order detail deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete the order detail." });
  }
};
