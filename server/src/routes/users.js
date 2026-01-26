import { Router } from 'express';
import Joi from 'joi';
import User from '../models/User.js';
import jwt from "jsonwebtoken";
import {generateAccessToken, generateRefreshToken, MAX_AGE_REFRESH_TOKEN} from "../utils/token.js";

const router = Router();

// Validation schema derived from frontend types
const userSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

let refreshTokens = [];

// Register user
router.post('/register', async (req, res, next) => {

    const { value, error } = userSchema.validate(req.body, { stripUnknown: true });
    if (error) {
        return res.status(400).json({ error: error.message });
    }

    const { username, password } = value;

    const userExists = await User.findOne( {username});
    if (userExists){
        res.status(400)
        return res.status(400).json({ error: "User already exists"});
    }

    const user = await User.create( {username, password});
    if (user) {
        res.status(201).json( {username})
    } else {
        res.status(400);
        throw new Error("User could not be created");
    }
});

// Get users
router.post('/login', async (req, res, next) => {
    try {

        const { value, error } = userSchema.validate(req.body, { stripUnknown: true });
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        const { username, password } = value;

        const user = await User.findOne( { username });
        if (user && (await user.matchPassword(password))) {

            // Creating an access token
            const accessToken = generateAccessToken(username);

            // Creating refresh token not expiring on refresh
            const refreshToken = generateRefreshToken(username);

            // Assigning refresh token in http-only cookie
            res.cookie('jwt', refreshToken, {
                path: '/api/v1',
                httpOnly: true,
                sameSite: 'None',
                secure: true,
                maxAge: MAX_AGE_REFRESH_TOKEN
            });

            refreshTokens.push(refreshToken);

            return res.json({ username, accessToken });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (e) {
        next(e);
    }
});

// Renew access token and refresh token
router.post("/refresh", (req, res) => {
    const refreshToken = req.cookies.jwt;
    const { username } = req.body;

    if (!username || !refreshToken || !refreshTokens.includes(refreshToken)) {
        return res.status(403).json({ message: "Your token is not correct" });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err) => {
        if (err) {
            return res
                .status(403)
                .json({ message: "Your session has expired. Please log in again." });
        }

        // Generate new access token
        const accessToken = generateAccessToken(username);
        return res.json({ accessToken });
    });
});

router.post('/logout', (req, res) => {
    const refreshToken = req.cookies.jwt;
    if (refreshToken) {
        refreshTokens = refreshTokens.filter(token => token !== refreshToken);
        res.clearCookie('jwt', { path: '/api/v1' });
    }
    res.status(200).json({ message: 'Logout successful' });
});

export default router;
