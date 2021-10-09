const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    productPrice: {
      type: String,
      required: true,
    },
    productQuantity: {
      type: String,
      required: true,
    },
    productCategory: {
      type: ObjectId,
      ref: 'categories',
    },
    productImages: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model('Product', productSchema);
module.exports = productModel;
