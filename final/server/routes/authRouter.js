const express = require('express');
const {
    signup,
    login,
    googleLogin,
    forgotPassword,
    resetPassword,
} = require('../Controllers/authController');
const {
    signupvalidation,
    loginvalidation
} = require('../middlewares/authvalidation');

const router = express.Router();

router.post('/login', loginvalidation, login);
router.post('/signup', signupvalidation, signup);
router.post('/google-login', googleLogin);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

module.exports = router;
