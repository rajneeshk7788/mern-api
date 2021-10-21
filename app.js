const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const loginRoute = require('./api/routes/login');
const contactRoute = require('./api/routes/contact');
const signupRoute = require('./api/routes/signup');
const bodyParser = require('body-parser');

const connectionString = process.env.CONNECTION_STRING;

mongoose.connect(connectionString);


mongoose.connection.on('error', err => {
    console.log('connection faild');
});

mongoose.connection.on('connected', connected => {
    console.log('connected with database.....');
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/login', loginRoute);
app.use('/contact', contactRoute);
app.use('/signup', signupRoute);

app.use((req, res, next) => {
    res.status(404).json({
        Error: "Bad Request"
    })
});



module.exports = app;