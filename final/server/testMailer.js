require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

transporter.sendMail({
    from: `"Test Mailer" <${process.env.EMAIL_USER}>`,
    to: 'yourpersonalemail@gmail.com', // your test email
    subject: 'Test Email',
    text: 'If you get this, SMTP is working fine.'
}).then(() => {
    console.log('✅ Email sent successfully');
}).catch((err) => {
    console.error('❌ Failed to send:', err);
});
