const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.generateToken = (email, res) => {
    const token = jwt.sign({email}, process.env.JWT_TOKEN, {expiresIn: '1h'});
    res.cookie('authCookie', token, {httpOnly: true});
    return token
}
