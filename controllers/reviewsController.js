const Review = require("../models/reviews");
const Product = require("../models/products");

exports.createReviews = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        const review = new Review(req.body.review);
        product.reviews.push(review);
        await review.save();
        await product.save();
        return res.status(200).json({ review });
    } catch (err) {
        next(err);
    }
};