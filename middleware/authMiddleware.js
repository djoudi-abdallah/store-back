const jwt = require("jsonwebtoken");
// Replace with your own secret key

const authMiddleware = (req, res, next) => {
  // Check if the request has an "Authorization" header with a Bearer token
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided." });
  }

  // Verify the token and decode its payload
  jwt.verify(token, process.env.jwt, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token." });
    }

    // Attach the decoded payload to the request object
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
