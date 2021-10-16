const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/alluser', profileController.getAllUsers);
router.post('/oneuser', profileController.getOneUser);
router.post('/updateuser', profileController.updateUser);
router.post('/deleteuser', profileController.deleteUser);

// router.post('/adduser', profileController.AddUser);

module.exports = router;
