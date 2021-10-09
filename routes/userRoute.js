const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

router.route('/').get(userController.getAllUsers);
router.route('/:userID').get(userController.getOneUser);
router.delete('/:userID').delete(userController.deleteUser);
router.patch('/:userID').patch(userController.updateUser);

module.exports = router;
