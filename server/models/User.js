// models/User.js

const mongoose = require('mongoose');
const { isEmail } = require('validator'); // Validator package to validate email format
const bcrypt = require('bcryptjs'); // For password hashing

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [isEmail, 'Please enter a valid email address'] // Email validation
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Minimum password length

    },
    refreshToken: {
        type: String,
        default: null // To store refresh token
    }
});

// Hash password before saving the user
// userSchema.pre('save', async function (next) {
//     if (this.isModified('password')) {
//         this.password = await bcrypt.hash(this.password, 10);
//     }
//     next();
// });

// // Method to compare password
// userSchema.methods.comparePassword = async function (password) {
//     return await bcrypt.compare(password, this.password);
// };

const User = mongoose.model('User', userSchema);

module.exports = User;
