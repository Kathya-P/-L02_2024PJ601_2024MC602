const router = require('express').Router();
const ctrl = require('../controllers/publicaciones.controller');
const v = require('../validators/blog.validator');
const validate = require('../middlewares/validate');

router.get('/', ctrl.listar);
router.get('/usuario/:usuarioId', v.filtroUsuario, validate, ctrl.porUsuario);
router.get('/:id', v.id, validate, ctrl.obtener);
router.post('/', v.publicacion, validate, ctrl.crear);
router.put('/:id', [...v.id, ...v.publicacion], validate, ctrl.actualizar);
router.delete('/:id', v.id, validate, ctrl.eliminar);

module.exports = router;
