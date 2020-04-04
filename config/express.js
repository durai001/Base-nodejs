let express = require('express');
let compress = require('compression');
let methodOverride = require('method-override');
let passport = require('passport');
let ConnectRoles = require('connect-roles');
let busboy = require('express-busboy');
let cors = require('cors');
var bodyParser = require('body-parser');
let logger = require('morgan');

module.exports = function (app, config) {

  let env, isAuthenticated, user;
  env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env === 'development';
  user = new ConnectRoles({
    failureHandler: function (req, res, action) {
      let accept;
      accept = req.headers.accept || '';
      res.status(403);
      return res.json({
        message: 'Access Denied - You don\'t have permission to: ' + action
      });
    }
  });

  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }))

  busboy.extend(app, {
    upload: true,
    path: 'public/uploads',
    allowedPath: /./,
    mimeTypeLimit: ['image/jpeg', 'image/png']
  });


  app.use(compress());
  app.use(express["static"](config.root + '/public'));
  app.use(passport.initialize());
  app.use(user.middleware());
  app.use(logger('dev'));
  app.use(methodOverride());
  require('./passport')(passport);

  isAuthenticated = passport.authenticate('jwt', {
    session: false
  });

  user.use('access admin', function (req) {
    return req.user.related('role').get('name') === 'Admin';
  });


  app.use('/boogalu', require('../app/routes/index.route'));

  app.use(function (req, res, next) {
    return res.status(404).json({
      Error: "Not Found"
    });
  });
  if (app.get('env') === 'development') {
    app.use(function (err, req, res) {
      res.status(err.status || 500);
      return res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }
  return app.use(function (err, req, res) {
    res.status(err.status || 500);
    return res.render('error', {
      message: err.message,
      error: {},
      title: 'error'
    });
  });
};
