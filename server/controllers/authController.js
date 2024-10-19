const User = require('../models/User');
const bcrypt = require('bcrypt'); // Use bcrypt package
const jwt = require('jsonwebtoken');
const { compare } = require('bcrypt'); // Or 'bcrypt' if you are using that package
const { hash } = require('bcrypt'); // Or 'bcrypt' if you are using that package

// User Registration
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await hash(password, 10);

        // Create a new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        // Create JWT token and refresh token
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ userId: newUser._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

        // Save refresh token to the user
        newUser.refreshToken = refreshToken;
        await newUser.save();

        res.status(201).json({
            message: 'User registered successfully',
            accessToken,
            refreshToken
        });
    } catch (err) {
        console.error('Error registering user:', err.message);
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
};

// User Login
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        
        // If user not found, return error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the hashed password stored in the database
        
        const isMatch = await compare(password, user.password);
        console.log(isMatch);
        // console.log(user.password)

        // If the passwords do not match
        if (!isMatch) {
            return res.status(400).json({ message: 'Wrong password' });
        }

        // Create access and refresh tokens if the password matches
        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '55m' });
        const refreshToken = user.refreshToken || jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

        // Save refresh token if newly generated
        if (!user.refreshToken) {
            user.refreshToken = refreshToken;
            await user.save();
        }

        // Send success response with tokens
        res.status(200).json({
            message: 'Login successful',
            accessToken,
            refreshToken,
            username: user.username // Include the username in the response

        });
    } catch (error) {
        console.error('Error logging in:', error.message);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

// Refresh Token
exports.refreshToken = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(403).json({ message: 'Refresh token required' });
    }

    try {
        const user = await User.findOne({ refreshToken: token });
        if (!user) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        // Verify the refresh token
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid refresh token' });
            }

            // Create a new access token
            const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
            res.status(200).json({ accessToken });
        });
    } catch (err) {
        console.error('Error refreshing token:', err.message);
        res.status(500).json({ message: 'Error refreshing token', error: err.message });
    }
};
