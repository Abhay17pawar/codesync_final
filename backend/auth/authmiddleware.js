const { verifyToken } = require('./auth'); // Import the token verification function

// Middleware to verify JWT token
const authenticate = (req, res, next) => {
  // Get the token from Authorization header
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using the secret key
    const decoded = verifyToken(token);

    // Attach user data to the request object (for use in the route handler)
    req.user = decoded;

    // Call next middleware or route handler
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = authenticate;
