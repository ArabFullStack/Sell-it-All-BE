const Product = require("../models/products");

exports.fetchProducts = async (req, res, next) => {
    try {
        const { category } = req.query;
        if (category) {
            const products = await Product.find({category});
            return res.status(200).json({ products, category });
        } else {
            const products = await Product.find({});
            return res.status(200).json({ products });
        }  
    } catch (err) {
        next(err);
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        const { name, description, price, quantity, categories, image } = req.body;
        const product = new Product(req.body);
        await product.save();
        return res.status(200).json({ product });
    } catch (err) {
        next(err);
    }
};

exports.fetchSingleProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        return res.status(200).json({ product });
    } catch (err) {
        next(err);
    }
};