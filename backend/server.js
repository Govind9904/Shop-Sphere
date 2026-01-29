const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./Database/db");

// Import routes
const authRoutes = require("./Routes/auth");
const productRoutes = require("./Routes/product");
const cartRoutes = require("./Routes/cart");
const orderRoutes = require("./Routes/order");
const userRoutes = require("./Routes/user");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/user",userRoutes);


const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
