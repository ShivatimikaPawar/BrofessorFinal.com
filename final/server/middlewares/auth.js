// /backend/routes/auth.js

const express = require('express');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const dotenv = require('dotenv');
const User = require('../models/UserModel'); // adjust path based on your project

dotenv.config();

const router = express.Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google Login Route
router.post('/google-login', async (req, res) => {
    const { credential } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { name, email, picture } = payload;

        // Find or create user
        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({ name, email, profilePic: picture });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        res.status(200).json({
            success: true,
            token,
            user: { name: user.name, email: user.email, profilePic: user.profilePic },
        });
    } catch (error) {
        console.error('Google Login Error:', error);
        res.status(401).json({ success: false, message: 'Unauthorized' });
    }
});

module.exports = router;
