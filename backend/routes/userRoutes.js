const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

router.post("/login", userController.login);

router.post("/users", userController.insertUser);

router.get("/me", verifyToken, userController.me);

router.get("/users", verifyToken, userController.getUserList);

router.get("/users/:id", verifyToken, userController.getUserById);

router.put("/users/:id", verifyToken, userController.updateUser);

router.delete("/users/:id", verifyToken, isAdmin, userController.deleteUser);

module.exports = router;