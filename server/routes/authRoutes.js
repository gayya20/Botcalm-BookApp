const express = require('express');
const router = express.Router();
const { registerUser, loginUser, refreshToken } = require('../controllers/authController'); // Update imports

// Auth routes
router.post('/register', registerUser); // Make sure to use registerUser
router.post('/login', loginUser); // Make sure to use loginUser
router.post('/refresh', refreshToken); // Ensure refreshToken is imported correctly

module.exports = router;
    