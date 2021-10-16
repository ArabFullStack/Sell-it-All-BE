const User = require('../models/users');

const getAllUsers = async (req, res) => {
  try {
    const Users = await User.find({});
    if (Users) {
      return res.json({ Users });
    }
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const getOneUser = async (req, res) => {
  try {
    const User = await User.findById(req.body.userID);
    if (!User) {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const updateUser = async (req, res) => {
  try {
    const userObj = { ...req.body };
    if (
      userObj.firstName ||
      userObj.lastName ||
      userObj.email ||
      userObj.phoneNumber ||
      userObj.userImage
    ) {
      delete userObj.firstName;
      delete userObj.lastName;
      delete userObj.email;
      delete userObj.phoneNumber;
      delete userObj.userImage;
    }
    const user = await User.findByIdAndUpdate(
      req.body.userID,
      { ...userObj },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.save();
    return res.status(200).json({ message: 'Profile successfully updated' });
  } catch (error) {
    return res.status(500).json({ err });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.body.userID);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    } else {
      return res.status(202).json({ message: 'User successfully deleted' });
    }
  } catch (error) {
    return res.staus(500).json({ err });
  }
};

module.exports = { getAllUsers, getOneUser, updateUser, deleteUser };
