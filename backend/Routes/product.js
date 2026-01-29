const express = require("express");
const router = express.Router();
const { verifyToken } = require("../Middleware/AuthMiddleware");
const { addProduct, getProducts , deleteProduct , updateProduct} = require("../Controllers/ProductController");

// This All Routes for admin 
// Add new product
router.post("/add", verifyToken , addProduct);

// Get all products
router.post("/", verifyToken, getProducts);
router.delete("/delete/:id",verifyToken , deleteProduct);
router.put("/update/:id" , verifyToken , updateProduct);

module.exports = router;