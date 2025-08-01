const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        return res.status(403).json({ message: 'Unauthorized, JWT token required' });
    }

    const token = auth.split(' ')[1]; // Bearer <token>

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired JWT token' });
    }
};

module.exports = ensureAuthenticated;
