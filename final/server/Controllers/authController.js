const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const UserModel = require('../models/UserModel');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ✅ SIGNUP
const signup = async (req, res) => {
    const { name, emailid, Phonenumber, department, password, confirmPassword } = req.body;

    try {
        if (password !== confirmPassword) return res.status(400).json({ success: false, message: "Passwords do not match" });
        if (password.length < 4) return res.status(400).json({ success: false, message: "Password must be at least 4 characters long" });

        const existingUser = await UserModel.findOne({ emailid });
        if (existingUser) return res.status(400).json({ success: false, message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserModel({ name, emailid, Phonenumber, department, password: hashedPassword });
        await user.save();

        res.status(201).json({ success: true, message: "Signup successful" });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ LOGIN
const login = async (req, res) => {
    const { identifier, password } = req.body;

    try {
        if (!identifier || !password) return res.status(400).json({ message: "All fields are required", success: false });

        const isEmail = identifier.includes('@');
        const user = isEmail ? await UserModel.findOne({ emailid: identifier }) : await UserModel.findOne({ Phonenumber: identifier });

        if (!user) return res.status(403).json({ message: "User not found", success: false });

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) return res.status(403).json({ message: "Incorrect password", success: false });

        const jwtToken = jwt.sign(
            { emailid: user.emailid, userId: user._id },
            process.env.JWT_SECRET || "defaultSecretKey",
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successfully', success: true, jwtToken, emailid: user.emailid, name: user.name });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

// ✅ GOOGLE LOGIN
const googleLogin = async (req, res) => {
    const { credential: token } = req.body;

    try {
        if (!token) return res.status(400).json({ success: false, message: "Token not provided" });

        const ticket = await client.verifyIdToken({ idToken: token, audience: process.env.GOOGLE_CLIENT_ID });
        const payload = ticket.getPayload();
        const { email, name } = payload;

        let user = await UserModel.findOne({ emailid: email });

        if (!user) {
            user = new UserModel({ name, emailid: email, password: '', confirmPassword: '', Phonenumber: '', department: 'google' });
            await user.save();
        }

        const jwtToken = jwt.sign(
            { emailid: user.emailid, userId: user._id },
            process.env.JWT_SECRET || "defaultSecretKey",
            { expiresIn: '1h' }
        );

        res.status(200).json({ success: true, message: 'Google login successful', name: user.name, jwtToken });
    } catch (error) {
        console.error('Google login error:', error);
        res.status(401).json({ success: false, message: 'Google login failed' });
    }
};

// ✅ FORGOT PASSWORD
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await UserModel.findOne({ emailid: email });
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetToken = resetToken;
        user.resetTokenExpire = Date.now() + 3600000;
        await user.save();

        const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

await transporter.sendMail({
    to: user.emailid,
    from: process.env.EMAIL_USER,
    subject: "Reset Your Password",
    html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f2f2f2; color: #333;" >
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
            <div style="text-align: center; margin-bottom: 20px;">
                <img src="cid:logo" alt="Brofessor Logo" style="height: 40px;" />
            </div>
            <h2 style="color: #007BFF;">Reset Your Password</h2>
            <p>Hello,</p>
            <p>We received a request to reset your password. Click the button below to set a new one:</p>
            <div style="text-align: center; margin: 30px 0;">
                <a href="${resetLink}" style="background-color: #007BFF; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
            </div>
            <p>If you didn’t request this, please ignore this email.</p>
            <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;">
            <p style="font-size: 12px; color: #999;">This link will expire in 1 hour.</p>
        </div>
    </div>
    `
});


        res.status(200).json({ success: true, message: 'Password reset email sent!' });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// ✅ RESET PASSWORD
const resetPassword = async (req, res) => {


    console.log("TOKEN:", req.params.token);
    console.log("BODY:", req.body);


    const { token } = req.params;
    const { newPassword, confirmPassword } = req.body;

    if (!newPassword || !confirmPassword) return res.status(400).json({ success: false, message: "Password fields are required" });
    if (newPassword !== confirmPassword) return res.status(400).json({ success: false, message: "Passwords don't match" });

    try {
        const user = await UserModel.findOne({ resetToken: token, resetTokenExpire: { $gt: Date.now() } });
        if (!user) return res.status(400).json({ success: false, message: 'Invalid or expired token' });

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetToken = undefined;
        user.resetTokenExpire = undefined;
        await user.save();

        res.json({ success: true, message: 'Password reset successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = {
    signup,
    login,
    googleLogin,
    forgotPassword,
    resetPassword
};