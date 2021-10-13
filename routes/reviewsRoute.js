const express = require('express');
const router = express.Router();
const RevCtrl = require("../controllers/reviewsController");
const { authenticateUser, requireLogin } = require('../middlewares/auth');

// create a new review
router.post("/products/:id/reviews", requireLogin, authenticateUser,RevCtrl.createReviews);

module.exports = router;