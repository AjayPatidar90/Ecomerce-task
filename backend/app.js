require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongooseConnection = require('./App/connection/connection');

const app = express();
const server = http.createServer(app);

// ✅ CORS configuration

const corsOptions = {
    origin: "http://localhost:5173", // Allow all origins
    methods: ["GET", "POST"], // Allow these HTTP methods
    allowedHeaders: ["x-access-token", "Origin", "Content-Type", "Accept", "Authorization"], // Allowed headers
    credentials: true
};



app.use(cors(corsOptions));

// ✅ Middlewares
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// ✅ Example cookie routes
app.get('/set-cookie', (req, res) => {
    res.cookie('username', 'JohnDoe', {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // only secure in production
        sameSite: 'None', // ✅ Required for cross-site cookies
    });
    res.send('Cookie set ho gayi!');
});

app.get('/get-cookie', (req, res) => {
    const username = req.cookies.username;
    res.send(`Cookie value: ${username}`);
});

app.get('/clear-cookie', (req, res) => {
    res.clearCookie('username', {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'None',
    });
    res.send('Cookie clear ho gayi!');
});

// ✅ Import routes
require('./App/routes')(app);

// ✅ Start server
server.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
