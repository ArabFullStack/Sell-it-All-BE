const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/usersController');

//register a user
router.post('/register', UserCtrl.registerUser);

//login user
router.post('/login', UserCtrl.loginUser);

//logout a user
router.get('/logout', UserCtrl.logoutUser);

module.exports = router;