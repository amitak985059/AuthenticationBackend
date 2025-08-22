const jwt = require('jsonwebtoken');
const userModel = require('../model/user.model');

const authMiddleware = async (req, res, next) => {
  try {
    // pick token from cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find user
    const user = await userModel.findById(decoded._id).select('-password'); // exclude password
    if (!user) {
      return res.status(401).json({ error: 'Invalid token. User not found.' });
    }

    // attach user to request
    req.user = user;

    next();
  } catch (error) {
    console.error("Auth Error:", error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
