const mongoose = require('mongoose');
const userModel = require('./user.model');

const jwt = require('jsonwebtoken');
const jwtOptions = require('../../config/jwt');

const bcrypt = require('bcrypt');
const bcryptSalt = 10;

// Get all the users
exports.getUsers = function (req, res, next) {
  userModel.find({}, (err, users) => {
    if(err) {
      console.log(err);
			return res.send(500);
		}
    res.json(users);
  });
};

// Get user information
exports.getUser = function (req, res, next) {

};

// Create new user
exports.createUser = function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;

  if (!username || !password) {
    res.status(400).json({ message: 'Provide username and password' });
    return;
  }

  userModel.findOne({ username }, '_id', (err, foundUser) => {
    if (foundUser) {
      res.status(400).json({ message: 'The username already exists' });
      return;
    }

    let salt = bcrypt.genSaltSync(bcryptSalt);
    let hashPass = bcrypt.hashSync(password, salt);

    const newUser = new userModel({
      username: username,
      password: hashPass,
      email: email
    });

    newUser.save((err, user) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      else {
        const payload = {id: user._id, user: user.username};
        const token = jwt.sign(payload, jwtOptions.secretOrKey);

        res.status(200).json({ token, user });
      }
    });
  });

  // const newUser = new userModel({
  //   username: req.body.username,
  //   password: req.body.password,
  //   email: req.body.email
  // });
  //
  // newUser.save((err, user) => {
  //   if(err) {
  //     console.log(err);
	// 		return res.send(500);
	// 	}
  //   console.log('User saved successfully');
  //   res.json(user);
  // });
};

/*
router.post('/signup', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  if (!username || !password) {
    res.status(400).json({ message: 'Provide username and password' });
    return;
  }

  User.findOne({ username }, '_id', (err, foundUser) => {
    if (foundUser) {
      res.status(400).json({ message: 'The username already exists' });
      return;
    }

    let salt = bcrypt.genSaltSync(bcryptSalt);
    let hashPass = bcrypt.hashSync(password, salt);

    const theUser = new User({
      username,
      password: hashPass
    });

    theUser.save((err, user) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      else {
        const payload = {id: user._id, user: user.username};
        const token = jwt.sign(payload, jwtOptions.secretOrKey);

        res.status(200).json({ token, user });
      }
    });
  });
});
*/

// Update user information
exports.updateUser = function (req, res, next) {

};

// Remove a user
exports.removeUser = function (req, res, next) {

};
