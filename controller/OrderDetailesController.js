const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new order detail
exports.createOrderDetail = async (req, res) => {
  try {
    const { orderId, productId, quantity, unitPrice } = req.body;

    // Find the product by ID to check if it has an associated coupon
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        coupons: true, // Include associated coupons in the response
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    // Initialize discount to 0
    let discount = 0;

    // Check if the product has associated coupons
    if (product.coupons && product.coupons.length > 0) {
      const coupon = product.coupons[0]; // Assuming there's only one associated coupon

      // Check if the coupon has a percentage
      if (coupon.percentage !== null) {
        // Calculate the discount based on the percentage
        discount = (coupon.percentage / 100) * (quantity * unitPrice);
      } else if (coupon.amount !== null) {
        // Use the coupon amount as the discount
        discount = coupon.amount;
      }
    }

    // Calculate the totalAmount for the specific order detail
    const totalAmount = quantity * unitPrice;

    // Calculate the final totalAmount after applying the discount
    const finalTotalAmount = totalAmount - discount;

    // Create the order detail
    const orderDetail = await prisma.orderDetail.create({
      data: {
        orderIdd: orderId, // Correct the typo in the column name
        productId,
        quantity,
        unitPrice,
        discount, // Store the discount amount for reference
      },
    });

    // Update the totalAmount on the associated order
    await prisma.order.update({
      where: { id: orderId },
      data: {
        totalAmount: {
          increment: finalTotalAmount,
        },
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
