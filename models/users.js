const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 32,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    userImage: {
      type: String,
      required: true,
      default: 'user.png',
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
