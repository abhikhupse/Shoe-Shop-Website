// routes/productRoutes.js

const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const multer = require("multer");

// Existing multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Add Product route
router.post(
  "/add-product",
  upload.single("image"),
  productController.addProduct
);

// ✅ Fetch Products route
router.get("/all-products", productController.getAllProducts);
router.put(
  "/update-product/:id",
  upload.single("image"),
  productController.updateProduct
);
router.delete("/delete-product/:id", productController.deleteProduct);

module.exports = router;
