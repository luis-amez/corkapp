var express = require ('express');
var controller = require ('./noteTxt.controller');

var router = express.Router();


router.post('/', controller.createNote);
router.get('/', controller.getNotes);
router.put('/:id', controller.editNote);
//router.put('/:id/transfer', controller.transferCard);
router.delete('/:id', controller.removeNote);



module.exports = router;
