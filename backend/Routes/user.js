const express = require("express");
const router = express.Router();
const { verifyToken } = require("../Middleware/AuthMiddleware");
const { getProfile, updateProfile } = require("../Controllers/UserController");

// Profile routes
router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken, updateProfile);

module.exports = router;