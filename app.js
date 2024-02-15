var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
// var jwtValidation = require('./middleware/jwtValidation');
var cors = require('cors');

// load in any env variables from .env file
dotenv.config()

// establish a connection to mongodb
mongoose.connect(process.env.MONGO_DB);

// define our routers
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api'); // here can be files or folders!!!

// define the app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// defining middlewares to be used

if (process.env.NODE_ENV != 'production') {
  const CorsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
  }
  app.use(cors(CorsOptions)); // allow requests from any origin
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/dist')));
// app.use(jwtValidation);

////////////////// declare to use routers (middlewares)
app.use('/', indexRouter);
app.use('/api', apiRouter);

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error(err);
    return res.status(400).send({ status: 400, message: err.message });
    // Bad request    
  }
  next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
