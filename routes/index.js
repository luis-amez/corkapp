// var express = require('express');
// var router = express.Router();
//
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
//
// module.exports = router;

const path = require('path');

module.exports = function(app) {
  app.use('/api/user', require('../api/user'));
  app.use('/api/noteTxt', require('../api/noteTxt'));

	// catch 404 and forward to Angular
  app.all('/*', function (req, res) {
    res.sendfile(__dirname + '/public/index.html');
  });
};
