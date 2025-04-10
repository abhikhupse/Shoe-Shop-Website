const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes"); // ✅ Import product routes
const cors = require("cors");
const path = require("path");

dotenv.config(); // Load .env
connectDB(); // Connect to MongoDB

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from /uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // ✅

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes); // ✅ Add product routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
