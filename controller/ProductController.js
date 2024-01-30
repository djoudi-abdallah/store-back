const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, category, price, quantity, description, status } = req.body;
    const product = await prisma.product.create({
      data: {
        name,
        category,
        price,
        quantity,
        description,
        status,
      },
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Unable to create a product." });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch products." });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      res.status(404).json({ error: "Product not found." });
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch the product." });
  }
};

// Update a product by ID
exports.updateProductById = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const { name, category, price, quantity, description, status } = req.body;
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        category,
        price,
        quantity,
        description,
        status,
      },
    });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Unable to update the product." });
  }
};

// Delete a product by ID
exports.deleteProductById = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    await prisma.product.delete({
      where: { id: productId },
    });
    res.json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete the product." });
  }
};
