const router = require('express').Router();
const ctrl = require('../controllers/usuarios.controller');
const v = require('../validators/blog.validator');
const validate = require('../middlewares/validate');

router.get('/', v.filtrosUsuarios, validate, ctrl.listar);
router.get('/:id', v.id, validate, ctrl.obtener);
router.post('/', v.usuario, validate, ctrl.crear);
router.put('/:id', [...v.id, ...v.usuario], validate, ctrl.actualizar);
router.delete('/:id', v.id, validate, ctrl.eliminar);

module.exports = router;
