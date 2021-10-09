const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const port = process.env.PORT || 4000;

//Authentication Route
app.use('/api/v1/auth', require('./routes/authRoute'));

// Users Route
app.use('/api/v1/users', require('./routes/userRoute'));

module.exports = app;
