const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');

router.post('/signup', authController.signup)
router.post('/signin', authController.signin);
router.post('/verifyToken', authController.verifyToken);

module.exports = router; 