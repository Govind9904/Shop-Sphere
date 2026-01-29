const express = require("express");
const router = express.Router();
const { addToCart, getCart, updateCartItem, deleteCartItem } = require("../Controllers/CartController");
const { verifyToken } = require("../Middleware/AuthMiddleware"); // JWT middleware

// All routes are protected
router.post("/add", verifyToken, addToCart);
router.get("/", verifyToken, getCart);
router.put("/update", verifyToken, updateCartItem);
router.delete("/delete/:id", verifyToken, deleteCartItem);

module.exports = router;
