const config = require('../config');
const {Router} = require('express');

const router = Router();

// Initialize controller
const UserController = require('../controllers/UserController');

// Register
router.post('/users/register', UserController.register);

// Login
router.post('/users/login', UserController.login);

// Get User
router.get('/users/user', UserController.user);

module.exports = router;