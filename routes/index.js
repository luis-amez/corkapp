const path = require('path');
const passport = require('../config/passport');

module.exports = function(app) {
  app.use('/api/user', require('../api/user/user.route'));
  app.use('/api/cork', passport.authenticate('jwt', { session: false }), require('../api/cork/cork.route'));
  app.use('/api/noteTxt', passport.authenticate('jwt', { session: false }), require('../api/noteTxt/noteTxt.route'));

	// catch 404 and forward to Angular
  app.all('/*', function (req, res) {
    res.sendfile(__dirname + '/public/index.html');
  });
};
