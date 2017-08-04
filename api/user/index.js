const express = require('express');
const controller = require('./user.controller');
const passport = require('../../config/passport');

const router = express.Router();

router.post('/signup', controller.createUser);
router.post('/login', controller.loginUser);
router.get('/', controller.getUsers);
// router.get('/:id', controller.getUser);
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getUser);
// router.put('/:id', controller.editCard);
// router.put('/:id/transfer', controller.transferCard);
router.delete('/:id', controller.removeUser);

module.exports = router;
