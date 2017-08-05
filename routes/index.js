const path = require('path');

module.exports = function(app) {
  app.use('/api/user', require('../api/user/user.route'));

	// catch 404 and forward to Angular
  app.all('/*', function (req, res) {
    res.sendfile(__dirname + '/public/index.html');
  });
};
