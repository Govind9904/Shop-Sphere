const express = require("express");
const router = express.Router();
const { addProduct, getProducts } = require("../Controllers/ProductController");
const { verifyToken } = require("../Middleware /AuthMiddleware");

// Add new product
router.post("/add", verifyToken , addProduct);

// Get all products
router.post("/", verifyToken, getProducts);

module.exports = router;