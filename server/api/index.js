/* eslint-disable*/
const { Router } = require('express');

const router = Router();
const authRoutes = require('./auth');
const userRoutes = require('./user');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);

module.exports = router;
