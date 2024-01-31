const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new cart
exports.createCart = async (req, res) => {
  try {
    const { nbProduct, productId } = req.body;
    const userId = req.user.userId; // Get the user's ID from req.user

    const cart = await prisma.cart.create({
      data: {
        nbProduct,
        userId,
        productId, // Assign the productId directly to the cart
      },
    });
    res.json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to create a cart." });
  }
};


// Get all carts
exports.getAllCarts = async (req, res) => {
  try {
    const carts = await prisma.cart.findMany();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch carts." });
  }
};

// Get a cart by ID
exports.getCartById = async (req, res) => {
  try {
    const cartId = parseInt(req.params.id);
    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
    });
    if (!cart) {
      res.status(404).json({ error: "Cart not found." });
    } else {
      res.json(cart);
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch the cart." });
  }
};

// Update a cart by ID
exports.updateCartById = async (req, res) => {
  try {
    const cartId = parseInt(req.params.id);
    const { nbProduct } = req.body;
    const userId = req.user.userId;
    const updatedCart = await prisma.cart.update({
      where: { id: cartId },
      data: {
        nbProduct,
        userId,
      },
    });
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: "Unable to update the cart." });
  }
};

// Delete a cart by ID
exports.deleteCartById = async (req, res) => {
  try {
    const cartId = parseInt(req.params.id);
    await prisma.cart.delete({
      where: { id: cartId },
    });
    res.json({ message: "Cart deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete the cart." });
  }
};
