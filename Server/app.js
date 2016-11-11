var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require("./models/users");
var routes = require('./routes/index');
var users = require('./routes/users');
var movie = require('./routes/movie');
var app = express();
var connectflash = require('connect-flash');


// view engine setup
//app.set('views', path.join(__dirname, '../Client/dist'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({ secret: 'harsh Singhal', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(connectflash());
app.use(express.static(path.join(__dirname, 'dist')));


mongoose.connect("mongodb://localhost/movieDB");
var db = mongoose.connection;
db.on('error',console.error.bind(console,'Connection error.......!!!!!'));
db.once('open',function(){
 console.log("Connection to MongoDB successfully");
});

//app.use('/', routes);
app.post('/login',
  passport.authenticate('local', { failureFlash: 'Error',successFlash:'success' }),
  function(req, res) {
    res.json({responseText:'authenticated'});
    console.log("in Login");
});

app.get('/logout',function(){
  console.log("Session Deleted");
  //req.logout();
  res.send("logged out");
});

app.use('/users', users);
app.use('/movie',movie);


passport.use(new LocalStrategy(
  function(username, password, done) {
    var temp = User.findOne({ 'username': username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (user.password!==password) { return done(null, false); }
     //console.log("\n\n\n\n\n\n\n\n\n");
     return done(null, user);
    });
  }
));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
/*
app.get('/login',function(req,res){
  res.send("I am Login");
});*/





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.send("Page Not why Found");
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
