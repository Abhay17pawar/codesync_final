const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET; 

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
    { expiresIn: '1h' } 
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
