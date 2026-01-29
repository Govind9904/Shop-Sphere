const express = require("express");
const router = express.Router();
const { verifyToken } = require("../Middleware/AuthMiddleware");
const { placeOrder , getMyOrders, getOrderById , deleteOrder} = require("../Controllers/OrderController");


router.post("/place", verifyToken, placeOrder);
router.get("/my-orders", verifyToken, getMyOrders);
router.get("/:id", verifyToken, getOrderById);

// Admin Access Route
// router.get("/all", verifyToken, adminOnly, getAllOrders);
// router.put("/status/:id", verifyToken, adminOnly, updateOrderStatus);
// router.delete("/delete/:id", verifyToken, adminOnly, deleteOrder);

module.exports = router;