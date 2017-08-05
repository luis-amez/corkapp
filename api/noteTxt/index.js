var express = require ('express');
var controller = require ('./noteTxt.controller');

var router = express.Router();


router.post('/', controller.createNote); //POST para crear
router.get('/', controller.showNotes); //GET para mostrar
router.put('/:id', controller.editNote);  //PUT para editar
//router.put('/:id/transfer', controller.transferCard);
router.delete('/:id', controller.removeNote); //DELETE para eliminar



module.exports = router;
