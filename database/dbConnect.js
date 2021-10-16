const mongoose = require('mongoose');
module.exports = () => {
  mongoose
    .connect('mongodb://localhost:27017/sellitall', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Mongo Connection Open');
    })
    .catch((err) => {
      console.log('Mongo Connection Error', err);
    });
};
