// require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const cookieParser = require('cookie-parser');
const { authenticateUser, requireLogin } = require('./middlewares/auth');

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const productRoutes = require('./routes/productRoute');
const reviewRoutes = require('./routes/reviewRoute');
const categoryRoutes = require('./routes/categoryRoute');
const userRoutes = require('./routes/userRoutes');
const profileRoute = require('./routes/profileRoute');

//Database
const dbSetup = require('./database/dbConnect');
dbSetup();

//Routes
app.use(productRoutes);
app.use(reviewRoutes);
app.use(categoryRoutes);
app.use('/', userRoutes);
app.use('/', profileRoute);
app.use(authenticateUser);
app.use(requireLogin);

app.listen(port, () => {
  console.log(`app is listening on ${port}`);
});
