const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'my-Own-Secret';
const expiry = 60 * 60 * 1;

const createToken = (id) => {
    return jwt.sign({ id }, secret, { expiresIn: expiry })
};

//registering users
exports.registerUser = async (req, res) => {
    const { firstname, lastname, email, password, phoneNumber, userImage } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User({ firstname, lastname, email, password: hash, phoneNumber, userImage });
    await user.save();
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: expiry * 1000 });
    return res.status(201).json({user: user._id})
};

//logging in users
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: expiry * 1000 })
        return res.status(200).json({message: "You are logged in"})
    } else {
        return res.status(500).json({ message: 'Invalid email or password' })
    }
};

//logging out users
exports.logoutUser = (req, res) => {
    res.cookie('jwt', "", { maxAge: 1 })
    return res.status(200).json({message: 'Logged out'})
}