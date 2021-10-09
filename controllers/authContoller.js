const user = require('../models/users');
const Token = require('../models/token');
const { customAlphabet } = require('nanoid');
const bcrypt = require('bcrypt');
const { createToken } = require('../jwtServices');
const { token } = require('morgan');

//This is to ensure that a user's email is unique to him/her
exports.registerUser = (req, res) => {
  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) {
      return res.status(500).json({ err });
    }
    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'A user with this email already exists' });
    }
  });
  //This creates a new user account
  User.create(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      city: req.body.city,
      password: req.body.password,
      userImage: req.body.userImage,
    },
    (err, newUser) => {
      if (err) {
        return res.status(500).json({ err });
      }

      //Hashes users password.This validates the integrity of stored data.
      bycrypt.genSalt(10, (err, salt) => {
        if (err) {
          return res.status(500).json({ err });
        }
        bycrypt.hash(req.body.password, salt, (err, hashedPassword) => {
          if (err) {
            return res.status(500).json({ err });
            //creates jwt for new user so as to ensure trust and security in the application
            let token = createToken(newUser);
            if (!token) {
              return res.status(500).json({ err });
            }
            //sends registration successful response to user
            return res
              .status(200)
              .json({ message: 'Registration Successful', token });
          }
        });
      });
    }
  );
};

exports.loginUser = (req, res) => {
  User.findOne({ email: req.body.email }, (err, foundUser) => {
    if (err) {
      return res.status(500).json({ err });
    }
    if (!foundUser) {
      return res.status(401).json({ message: 'Unknown' });
    }
    let match = bcrypt.compareSync(req.body.password, foundUser.password);
    if (!match) {
      return res.status(401).json({ message: 'Unknown' });
    }
    let token = createToken(foundUser);
    if (!token) {
      return res.status(500).json({ err });
    }
    return res.status(200).json({ message: 'Successfully logged in', token });
  });
};

//Sends email to a particular user with the token for password reset request
exports.forgotPassword = (req, res) => {
  User.findOne({ email: req.body.email }, (err, foundUser) => {
    if (err) {
      return res.status(400).json({ err });
    }
    if (!foundUser) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    //Create an OTP and send to the user's registered email
    Token.create(
      {
        userId: user._id,
        email: req.body.email,
        token: customAlphabet('123456789', 8)(),
        createdAt: Date.now(),
      },
      (err, token) => {
        if (err) {
          return res.status(500).json({ err });
        }

        let text = 'Kindly enter numbers to reset your password' + token.token;
        sendMail(user.mail, 'Password reset', text, (err) => {
          if (err) {
            return res.status(500).json({ err });
          } else
            return res
              .status(200)
              .json({ message: 'Email successfully sent ' });
        });
      }
    );
  });
};

exports.resetPassword = (req, res) => {
  const { token, newPass } = req.body;
  let date1 = Token.createdAt;
  let date2 = Date.now();
  let date3 = Math.floor((date2 - date1) / 1000);

  if (date3 > 600) {
    return res
      .status(400)
      .json({ message: 'Token expired. Please attempt reset again' });
  }
  //This is checking if token is not a number and if the length is not up to 8
  if (!token) {
    return res
      .status(400)
      .json({ message: 'Invalid Token. Please request another token' });
  }
  //If newPass has a value of undefined or if it is empty
  if (!newPass || newPass == '') {
    return res
      .status(400)
      .json({ message: 'Password is required. Please enter a valid password' });
  }
  //checks if token is valid with user
  Token.findOne({ token })
    .populate('userId')
    .exec((err, foundToken) => {
      if (err) {
        return res
          .status(400)
          .json({ message: 'User with this token does not exist' });
      }

      const user = foundToken.userId;
      //hash new password for security
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          return res.status(500).json({ err });
        }
        bcrypt.hash(newPass, salt, (err, hashedPassword) => {
          if (err) {
            return res.status(500).json({ err });
          }
          //update password and get it saved in the database
          user.password = hashedPassword;
          user.save((err, result) => {
            if (err) {
              return res.status(400).json({ err: 'password reset error' });
            } else {
              return res
                .status(200)
                .json({ message: 'Password successfuly changed' });
            }
          });
        });
      });
    });
};
