const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userReviews = new mongoose.Schema(
  {
    review: String,
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    rating: String,
  },
  { timestamps: true }
);

const reviewModel = mongoose.model('Review', userReviews);
module.exports = reviewModel;
