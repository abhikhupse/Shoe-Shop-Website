const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("File:", req.file);

    const { title, description, price, category } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const newProduct = new Product({
      title,
      description,
      price,
      category,
      imageUrl,
    });

    await newProduct.save();

    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Failed to add product" });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// Update Product
// Update Product (handle JSON without image upload)
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.json({
      success: true,
      message: "Product updated",
      product: updatedProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
