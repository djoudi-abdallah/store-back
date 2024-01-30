const express = require("express");
const router = express.Router();
const userController = require("../controller/UserCntroller");
const signupMiddleware = require("../middleware/signupMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
// Define user-related routes here
router.post("/", signupMiddleware, userController.createUser);
router.post("/login", userController.loginUser);
router.get("/", adminMiddleware, userController.getAllUsers);
router.get("/one", authMiddleware, userController.getUserById);
router.put("/", authMiddleware, userController.updateUserById);
router.delete("/", authMiddleware, userController.deleteUserById);

module.exports = router;
