const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  categoryDescription: {
    type: String,
    required: true,
  },
  categoryImage: {
    type: String,
  },
});

const categoryModel = mongoose.model('Category', categorySchema);
module.exports = categoryModel;
