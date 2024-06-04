require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/errorMiddleware');

const PORT = process.env.PORT || 5000;
const host = '127.0.0.1';
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use('/api', router);
app.use(errorMiddleware);

app.get('/api/users', (req, res) => {
    res.send('Works');
});

app.use((req, res, next) => {
    res.status(404).type('text/plain');
    res.send('Not found');
});

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(PORT, host,  () => console.log(`Server started on PORT: ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}

start();