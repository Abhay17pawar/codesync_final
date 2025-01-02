const jwt = require('jsonwebtoken');

// Secret key to sign and verify the JWT
const JWT_SECRET = 'your_secret_key'; // Use a more secure secret key in production

// Function to sign a JWT token
const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      name : user.name,
      email: user.email,
      codeforces: user.codeforces,
      leetcode : user.leetcode,
      codechef : user.codechef
    },
    JWT_SECRET,
    { expiresIn: '1h' } // The token will expire in 1 hour
  );
};

// Function to verify a JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET); // Verifies the token using the secret key
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

module.exports = { generateToken, verifyToken };
