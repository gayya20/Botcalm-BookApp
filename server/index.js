const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS package
require('dotenv').config(); // Load the .env file
const authRoutes = require('./routes/authRoutes'); // Import auth routes
const bookRoutes = require('./routes/bookRoutes'); // Import book routes

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  credentials: true, // Enable if you need to send cookies
}));
app.use(express.json()); // Middleware to parse JSON requests

// Routes
app.use('/auth', authRoutes); // Register auth routes
app.use('/api/books', bookRoutes); // Register book routes

// Start server
app.listen(PORT, () => {    
  console.log(`Server is running on port ${PORT}`);
});
