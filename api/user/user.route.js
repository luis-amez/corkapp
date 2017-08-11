const express = require('express');
const controller = require('./user.controller');
const passport = require('../../config/passport');

const router = express.Router();

router.post('/signup', controller.createUser);
router.post('/login', controller.loginUser);
router.get('/', controller.getUsers);
router.post('/public', controller.getPublicCork);
router.get('/token', passport.authenticate('jwt', { session: false }), controller.getToken);
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getUser);
// router.put('/:id', controller.editUser);
router.delete('/:id', controller.removeUser);


module.exports = router;
