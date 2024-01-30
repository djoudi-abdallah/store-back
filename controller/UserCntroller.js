const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Check if the user exists and the password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Generate a JWT token for the user
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.jwt
    );

    // Send the token in the response
    res.json({ user, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber, isAdmin } = req.body;

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword, // Store the hashed password
        phoneNumber,
        isAdmin,
      },
    });

    // Generate a JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.jwt
    );

    // Send the token in the response
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Unable to create a user." });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch users." });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = parseInt(req.user.userId);
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      res.status(404).json({ error: "User not found." });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch the user." });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const userId = parseInt(req.user.userId);
    const { fullName, email, password, phoneNumber, isAdmin } = req.body;
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        fullName,
        email,
        password,
        phoneNumber,
        isAdmin,
      },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Unable to update the user." });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const userId = parseInt(req.user.userId);
    await prisma.user.delete({
      where: { id: userId },
    });
    res.json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete the user." });
  }
};
