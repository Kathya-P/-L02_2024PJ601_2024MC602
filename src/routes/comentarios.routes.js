const router = require('express').Router();
const ctrl = require('../controllers/comentarios.controller');
const v = require('../validators/blog.validator');
const validate = require('../middlewares/validate');

router.get('/', ctrl.listar);
router.get('/publicacion/:publicacionId', v.filtroPublicacion, validate, ctrl.porPublicacion);
router.get('/usuario/:usuarioId', v.filtroUsuario, validate, ctrl.porUsuario);
router.get('/:id', v.id, validate, ctrl.obtener);
router.post('/', v.comentario, validate, ctrl.crear);
router.put('/:id', [...v.id, ...v.comentario], validate, ctrl.actualizar);
router.delete('/:id', v.id, validate, ctrl.eliminar);

module.exports = router;
