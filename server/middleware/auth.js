const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.header('Authorization')?.split(' ')[1]; // Get the token part after 'Bearer '

  // Check if the token exists
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    // Verify the token using the secret
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Token verified:", verified);

    // Attach the user information to the request object
    req.user = verified;
    next();
  } catch (err) {
    console.log("Token verification failedxxxxxxxxxxxxxxxxxx:", err.message);
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = auth;
