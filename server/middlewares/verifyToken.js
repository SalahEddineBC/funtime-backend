/* eslint-disable*/
const jwt = require('jwt-then');

const JWT_SECRET = 'th@ts our s3cr3t!!';
const User = require('../models/user');

const isLogged = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).send({ success: false, message: 'No token provided.' });
  }
  try {
    const decoded = await jwt.verify(token, JWT_SECRET);
    req.UserId = decoded.id;
    const user = await User.findById(decoded.id);
    req.user = user;
    if (!user) return res.status(400).send({ success: false, error: 'token you provided doesnt match any user' });
    return next();
  } catch (err) {
    return res.status(401).send({ success: false, message: 'Invalid token' });
  }
};

module.exports = isLogged;
