const session = require('express-session');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// express-session setup
const sess = {
  secret: 'ausazko hitz multzoa',
  resave: false,
  saveUninitialized: true,
  cookie: {},
};
app.use(session(sess));

// serve static files
app.use(express.static(path.join(__dirname, 'public/')));
//app.use(express.static(path.join(__dirname, 'views')));


// username and password
const myusername = 'user1';
const mypassword = 'mypassword';

// routes setup
app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
