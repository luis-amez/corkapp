const mongoose = require('mongoose');
const userModel = require('./user.model');

// Get all the users
exports.getUsers = function (req, res, next) {

};

// Get user information
exports.getUser = function (req, res, next) {

};

// Create new user
exports.createUser = function (req, res, next) {
  // const newUser = new userModel({
  //   username: req.body.username,
  //   password: req.body.password,
  //   email: req.body.email
  // });

  const newUser = new userModel({
    username: req.body.user,
    password: req.body.password,
    email: req.body.email
  });

  newUser.save((err, user) => {
    if(err) {
      console.log(err);
			return res.send(500);
		}
    console.log('User saved successfully');
    res.json({ success: true });
  });
};

// Update user information
exports.updateUser = function (req, res, next) {

};

// Remove a user
exports.removeUser = function (req, res, next) {

};
