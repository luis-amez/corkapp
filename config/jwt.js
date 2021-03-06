const passportJwt = require('passport-jwt');
const ExtractJwt  = passportJwt.ExtractJwt;

let jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = process.env.JWT_SECRET; 

module.exports = jwtOptions;
