const express = require("express")
const router = express.Router();
const { verifyToken } = require("../Middleware/AuthMiddleware");
const { addProduct, getProducts , getProductById , deleteProduct , updateProduct} = require("../Controllers/ProductController");

// This All Routes for admin 
// Add new product
router.get("/add",verifyToken,addProduct);

// Get all products
router.get("/", getProducts);
router.get("/:id",getProductById);
router.delete("/delete/:id",verifyToken , deleteProduct);
router.put("/update/:id" , verifyToken , updateProduct);

module.exports = router;