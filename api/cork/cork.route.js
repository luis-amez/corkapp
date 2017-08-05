var express =require ('express');
var controller = require ('./cork.controller');

var router = express.Router();

router.post('/', controller.createCork);      //POST para crear
router.get('/:id', controller.showCork);      //GET para mostrar
//router.put('/', controller.editCork);         //PUT para editar
//router.delete('/', controller.removeCork);    //DELETE para eliminar

module.exports = router;
