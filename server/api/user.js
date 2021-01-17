/* eslint-disable*/
const { Router } = require('express');
const verifyToken = require('../middlewares/verifyToken');

const router = Router();
router.get('/', verifyToken, (req, res) => res.send({ success: true, message: 'You are connected' }));
module.exports = router;
