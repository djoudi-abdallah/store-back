const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { status } = req.body;
    const userId = req.user.userId;

    // Find all carts associated with the current user
    const carts = await prisma.cart.findMany({
      where: {
        userId: userId,
      },
      include: {
        product: true, // Include associated product details
      },
    });

    // Calculate the total amount by summing up the product prices in the carts
    const totalAmount = carts.reduce((total, cart) => {
      return total + cart.product.price * cart.nbProduct;
    }, 0);

    // Create the order
    const order = await prisma.order.create({
      data: {
        nbProduct: carts.length, // Number of products is the number of carts
        totalAmount,
        status,
        userId,
      },
    });

    // Create order details for each cart
    for (const cart of carts) {
      await prisma.orderDetail.create({
        data: {
          orderIdd: order.id, // Correct the typo in the column name
          productId: cart.product.id,
          quantity: cart.nbProduct,
          unitPrice: cart.product.price,
          discount: 0, // You can calculate discounts if needed
        },
      });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Unable to create an order." });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch orders." });
  }
};

// Get an order by ID
exports.getOrderById = async (req, res) => {
  try {
    const orderId = parseInt(req.params.id);
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });
    if (!order) {
      res.status(404).json({ error: "Order not found." });
    } else {
      res.json(order);
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch the order." });
  }
};

// Update an order by ID
exports.updateOrderById = async (req, res) => {
  try {
    const orderId = parseInt(req.params.id);
    const { nbProduct, totalAmount, status } = req.body;
    const userId = req.user.userId;
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        nbProduct,
        totalAmount,
        status,
        userId,
      },
    });
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: "Unable to update the order." });
  }
};

// Delete an order by ID
exports.deleteOrderById = async (req, res) => {
  try {
    const orderId = parseInt(req.params.id);
    await prisma.order.delete({
      where: { id: orderId },
    });
    res.json({ message: "Order deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete the order." });
  }
};
