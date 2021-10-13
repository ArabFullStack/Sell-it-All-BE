const Category = require("../models/categories");

exports.fetchCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({});
        return res.status(200).json({ categories });
    } catch (err) {
        next(err)
    }
};

exports.createCategory = async (req, res, next) => {
    try {
        const { name, description, image, products } = req.body;
        const category = new Category(req.body);
        await category.save();
        return res.status(200).json({ category });
    } catch (err) {
        next(err);
    }
};

