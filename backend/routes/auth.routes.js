const express = require('express');
const router = express.Router();
const { register, login, logout, getUserById, updateUserProfile } = require('../controller/auth.controller');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/users/:id', getUserById);
router.put('/users/:id', authMiddleware, updateUserProfile);

module.exports = router;