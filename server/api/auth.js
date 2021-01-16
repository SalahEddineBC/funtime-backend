/* eslint-disable*/
const bcrypt = require('bcrypt');
const jwt = require('jwt-then');
const { Router } = require('express');

const router = Router();
const User = require('../models/user');

const JWT_EXPIRATION = '10d';
const JWT_SECRET = 'th@ts our s3cr3t!!';

// login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send({ success: false, message: 'invalid request' });
    }
    const user = await User.findOne({ $or: [{ email: username }, { username }] });
    if (user) {
      const matchPasswords = await bcrypt.compare(
        password,
        user.password,
      );
      if (!matchPasswords) {
        return res.status(401).send({
          success: false,
          message: 'Wrong Email or password',
        });
      }
      const token = await jwt.sign(
        { email: user.email, id: user._id },
        JWT_SECRET,
        {
          expiresIn: JWT_EXPIRATION,
        },
      );
      return res.status(200).send({
        success: true,
        message: 'logged in',
        token,
      });
    }
    return res.status(403).send({ success: false, message: 'login failed, check your email and password' });
  } catch {
    return res.status(500).send({ message: 'Unhadled error' });
  }
});
// Register
router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res.status(400).send({ success: false, message: 'invalid request' });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = User.create({
      email,
      username,
      password: hash,
    });
    return res.status(201).send({ message: 'account created succefully' });
  } catch {
    return res.status(500).send({ message: 'Unhadled error' });
  }
});

module.exports = router;
