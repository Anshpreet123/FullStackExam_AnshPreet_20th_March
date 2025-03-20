const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
    try {
        let { search, category, page = 1, limit = 10 } = req.query;
        let query = {};

        if (search) query.name = { $regex: search, $options: "i" };
        if (category) query.category = category;

        const products = await Product.find(query)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};