const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Get the token from the request headers
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log(token)

    // Check if token exists
    if (!token) {
        return res.status(401).json({ 
            message: 'No authentication token, authorization denied.' 
        });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log(decoded)

        // Attach the user ID to the request object
        req.user = decoded.id;

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        // Handle invalid or expired token
        return res.status(401).json({ 
            message: 'Token is not valid' 
        });
    }
};

module.exports = authMiddleware;