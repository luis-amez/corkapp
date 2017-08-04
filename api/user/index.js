const express = require('express');
const controller = require('./user.controller');

const router = express.Router();

router.get('/', controller.getUsers);
router.post('/signup', controller.createUser);
router.post('/login', controller.loginUser);
// router.put('/:id', controller.editCard);
// router.put('/:id/transfer', controller.transferCard);
// router.delete('/:id', controller.removeCard);

module.exports = router;
