const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

// ✅ Load environment variables
dotenv.config();

// ✅ Initialize express app
const app = express();

// ✅ MongoDB connection
require('./models/db');

// ✅ CORS setup (allow frontend origin)
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));

// ✅ Middlewares
app.use(bodyParser.json());
app.use(express.json());

// ✅ Routes
const authRouter = require('./routes/authRouter');
const productRouter = require('./routes/ProductRouter');
const verifyToken = require('./middlewares/verifyToken');

app.use('/auth', authRouter);           // Auth routes
app.use('/products', productRouter);    // Product routes

// ✅ Test route
app.get('/ping', (req, res) => {
    res.send('PONG');
});

// ✅ Protected route (auth required)
app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: `Hello ${req.user.emailid}` });
});

// ✅ Serve React build in production
const path = require('path');
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'public')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
}

// ✅ Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
