var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var connectDB = require('./config/db')

var authRoutes = require('./routes/authRoutes')
var usersRouter = require('./routes/userRoutes')

var app = express();
connectDB()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/health", (req, res)=>res.status(200).send("Server is running!"))

app.use('/auth', authRoutes);
app.use('/users', usersRouter);

module.exports = app;
