const express = require('express');
const router = express.Router();
const { register, login, logout, getUserById, updateUserProfile, getLoggedInUser } = require('../controller/auth.controller');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/users/me', authMiddleware, getLoggedInUser); // this route kept up all /:id routes because express gets confused with /me and / id
router.get('/users/:id', getUserById);
router.put('/users/:id', authMiddleware, updateUserProfile);

module.exports = router;