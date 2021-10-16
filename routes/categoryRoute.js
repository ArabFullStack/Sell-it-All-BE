const express = require('express');
const router = express.Router();
const CtgCtrl = require('../controllers/categoryController');
const { authenticateUser, requireLogin } = require('../middlewares/auth');

//retrieve all categories
router.get(
  '/categories',
  requireLogin,
  authenticateUser,
  CtgCtrl.fetchCategories
);

// create a new category
router.post(
  '/categories',
  requireLogin,
  authenticateUser,
  CtgCtrl.createCategory
);

module.exports = router;
