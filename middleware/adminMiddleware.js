const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const adminMiddleware = async (req, res, next) => {
  try {
    // Check if the request has an "Authorization" header with a Bearer token
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized: No token provided." });
    }

    // Verify the token and decode its payload
    jwt.verify(token, process.env.jwt, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized: Invalid token." });
      }

      // Now that the token is verified, you can use the decoded payload
      const userId = decoded.userId;

      // Check if the user has admin privileges (you can define your own criteria)
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (user && user.isAdmin) {
        next(); // User is an admin, continue to the next middleware or route
      } else {
        res.status(403).json({ error: "Access denied. You are not an admin." });
      }
    });
  } catch (error) {
    console.error("Admin middleware error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = adminMiddleware;
