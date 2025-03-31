var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); // Import cors

var app = express(); // Define app first!

// Apply CORS Middleware before any routes or middleware
app.use(cors({
  origin: ['http://localhost:3001'], // Allow frontend origin
  methods: 'GET,POST,PUT,DELETE', // Allowed request methods
  allowedHeaders: 'Content-Type, Authorization' // Allowed headers
}));

// Import routes
var auth = require('./routes/auth');
var resource = require('./routes/resources');
var userResources = require('./routes/userResources');
var users = require('./routes/users');
const authMiddleware = require('./middleware/resources');

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/auth', auth);
app.use('/resource', resource);
app.use('/userResources', userResources);
app.use('/users', users);
// app.use('/api', authMiddleware, courseRoutes);


// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
