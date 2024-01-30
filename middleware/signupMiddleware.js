// middleware/signupMiddleware.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const signupMiddleware = async (req, res, next) => {
  try {
    // Check if the email is already registered
    const existingUser = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use.' });
    }

    // If email is unique, continue to the next middleware or route
    next();
  } catch (error) {
    console.error('Signup middleware error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = signupMiddleware;
