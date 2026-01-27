const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./Database/db");

// Import routes
const authRoutes = require("./Routes/auth");
const productRoutes = require("./Routes/product");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
