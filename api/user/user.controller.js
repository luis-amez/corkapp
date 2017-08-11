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
    let usersInfo = [];
    users.forEach((user) => {
      usersInfo.push({
        userId: user._id,
        username: user.username
      });
    });
    res.json(usersInfo);
  });
};

// Get user information
exports.getUser = function (req, res, next) {
  let id = req.params.id;

  userModel.findById(req.params.id, function(err, user) {
    if (err) {
      res.json({ message: 'Impossible to retrieve the usesr', error: err });
    }
    res.json(user);
  });
};

// Signup
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
        user.createInitialCorks(true, "Write here something you want to remember...");
        let pri = false;
        let mes = "Write here something you want to share. Your birthday wantlist would be an amazing idea!";
        setTimeout(function() {
          user.createInitialCorks(pri, mes);
        }, 1500);

        const payload = {id: user._id, user: user.username};
        const token = jwt.sign(payload, jwtOptions.secretOrKey);

        res.status(200).json({ token, user });
      }
    });
  });
};

// Login
exports.loginUser = function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;

  if (!username || !password) {
    res.status(401).json({ message: 'Provide username and password' });
    return;
  }

  userModel.findOne({'username': username}, (err, user) => {
    if (!user) {
      res.status(401).json({ message: 'The username or password is incorrect' });
      return;
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (!isMatch) {
        res.status(401).json({ message: 'The username or password is incorrect' });
      }
      else {
        const payload = {id: user._id, user: user.username};
        const token = jwt.sign(payload, jwtOptions.secretOrKey);

        res.status(200).json({ token, user });
      }
    });
  });
};

// Get authentication token
exports.getToken = function (req, res, next) {
  res.status(200).json({ token: req.token, user: req.user });
};

// Update user information
exports.updateUser = function (req, res, next) {

};

// Remove a user
exports.removeUser = function (req, res, next) {
  userModel.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.json({ message: 'Impossible to remove the user', error: err });
    }
    res.json({ message: 'User removed successfully' });
  });
};

// Get public cork
exports.getPublicCork = function (req, res, next) {
  let name = req.body.friend;
  console.log("Name: ", name);

  userModel.findOne({ username: name } , function(err, user) {
    if (err) {
      res.json({ message: 'Impossible to retrieve the usesr', error: err });
    }
    console.log("User: ", user);
    console.log("Cork: ", user.corks[1]);
    res.json(user.corks[1]);
  });
};
