const User = require('../models/users');
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require('../middlewares/response');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      status: 'success',
      result: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    sendErrorResponse(res, `server error: ${error.message}`, 500);
  }
};

const getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userID);

    if (!user) {
      return sendErrorResponse(res, 'User not found', 404);
    }
    sendSuccessResponse(user, res, 'User found', 200);
  } catch (error) {
    sendErrorResponse(res, `Server error: ${error.message}`, 500, error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userID);

    if (!user) {
      return sendErrorResponse(res, 'User not found', 404);
    }

    sendSuccessResponse(null, res, 'User deleted successfully', 204);
  } catch (error) {
    sendErrorResponse(res, `server error: ${error.message}`, 500, error);
  }
};

const updateUser = async (req, res) => {
  const userObj = { ...req.body };

  try {
    if (userObj.email || userObj.products || userObj.orders) {
      delete userObj.email;
      delete userObj.products;
      delete userObj.orders;
    }

    const user = await User.findByIdAndUpdate(
      req.params.userID,
      { ...userObj },
      { new: true }
    );

    if (!user) {
      return sendErrorResponse(res, 'User not found', 404);
    }
  } catch (error) {
    sendErrorResponse(res, `server error: ${error.message}`, 500, error);
  }
};
module.exports = {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
};
