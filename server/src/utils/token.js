import jwt from "jsonwebtoken";
import User from "../models/User.js";

const MAX_AGE_REFRESH_TOKEN = 30 * 24 * 60 * 60 * 1000;
const MAX_AGE_ACCESS_TOKEN = 24 * 60 * 60 * 1000;

const generateAccessToken = (username) => {
    return jwt.sign(
        { username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: MAX_AGE_ACCESS_TOKEN + 'ms'}
    );
}

const generateRefreshToken = (username) => {
  return jwt.sign(
      { username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: MAX_AGE_REFRESH_TOKEN + 'ms' }
  );
}

const authenticateAccessToken = async (req, res, next) => {

    // Grab token from the authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // If no token is provided, return an error
    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized. No token provided.'
        });
    }
    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Look up the current role from the database so that privilege
        // changes (e.g. admin demotion) take effect immediately.
        const user = await User.findOne({ username: decoded.username }).select('username isAdmin').lean();
        if (!user) {
            return res.status(401).json({ message: 'User no longer exists.' });
        }

        req.user = { username: user.username, isAdmin: user.isAdmin === true };
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Forbidden - Invalid or expired token',
        });
    }
};

export { generateAccessToken, generateRefreshToken, authenticateAccessToken, MAX_AGE_REFRESH_TOKEN };