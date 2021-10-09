const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const orderSchema = new mongoose.Schema(
  {
    allProduct: [
      {
        id: { type: ObjectId, ref: 'products' },
        quantity: Number,
      },
    ],
    user: {
      type: ObjectId,
      ref: 'users',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pickedup', 'Cancelled'],
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model('Order', orderSchema);
module.exports = orderModel;
