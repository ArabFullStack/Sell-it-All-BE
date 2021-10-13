// const mongoose = require('mongoose');

// const connectDB = (url) => {
//   return mongoose
//     .connect(url, {
//       useNewUrlParser: true,
//       useCreateIndex: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false,
//     })
//     .then(() => console.log('Database successfully connected'))

//     .catch((err) => console.log('Database connection failed'));
// };

// module.exports = connectDB;
 
const mongoose = require('mongoose');
module.exports = () => {
  mongoose.connect('mongodb://localhost:27017/sellitall', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log("Mongo Connection Open")
    })
    .catch(err => {
      console.log("Mongo Connection Error", err)
    });
};