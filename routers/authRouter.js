const express = require('express');
const router = express.Router();
const {
    register,
    login,
    details,
    logout
} = require('../controllers/authController');
const { authenticateUser } = require('../middleware/authentication');

router.post('/register', register);
router.post('/login', login);
router.get('/details/:id',authenticateUser, details);
router.get('/logout',authenticateUser, logout);

module.exports = router;
