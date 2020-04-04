let ExtractJwt, JwtStrategy, LocalStrategy, User, tokenSecret;

JwtStrategy = require('passport-jwt').Strategy;

ExtractJwt = require('passport-jwt').ExtractJwt;

User = require('../app/models/user');

tokenSecret = require('./config').tokenSecret;

LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
  let opts;
  opts = {};
  opts.secretOrKey = tokenSecret;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("JWT");
  opts.ignoreExpiration = true;
  passport.use('jwt', new JwtStrategy(opts, function(jwt_payload, done) {
     return User.forge({
      UID: jwt_payload.UID
    }).fetch({
      require:false,
      withRelated: ['role']
    }).then(function(user) {
      if(user){
        console.log('Authentication success');
        return done(null, user);
      }else{
        console.log('Authentication failed');
        return done(new Error("Unauthorized"), "");
      }
      // }
    })["catch"](function(err) {
      console.log(err)
      return done(err, false);
    });
  })) 
  return passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function(email, password, done) {
    let criteria;
    if (!email || !password) {
      return done({
        err: 'Email and Password required'
      });
    }
    criteria = email.indexOf('@') === -1 ? {
      userName: email
    } : {
      email: email
    };
    return User.forge(criteria).fetch({
      withRelated: ['role']
    }).then(function(user) {
      if (!user) {
        return done(null, {
          err: 'Invalid Username/Email'
        });
      }
      return User.comparePassword(password, user, function(err, valid) {
        if (err) {
          return done(err);
        }
        if (!valid) {
          return done(null, {
            err: 'Invalid Password'
          });
        }
        if (valid) {
          return done(null, user);
        }
      });
    });
  }));
};

