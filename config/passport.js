const passport = require('passport');
const passportJwt = require('passport-jwt');
const JwtStrategy = passportJwt.Strategy;

const jwtOptions = require('./jwt');
const User = require('../api/user/user.model');

let strategy = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.id, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
    // user ? done(null, user) : done(null, false);
  });
});

passport.use(strategy);

module.exports = passport;
