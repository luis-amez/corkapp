const express = require('express');
const user = require('./user.controller');

const router = express.Router();

router.post('/', user.createUser);
// router.put('/:id', controller.editCard);
// router.put('/:id/transfer', controller.transferCard);
// router.delete('/:id', controller.removeCard);

module.exports = router;
