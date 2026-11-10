const router = require('express').Router();

router.use('/usuarios', require('./usuarios.routes'));
router.use('/publicaciones', require('./publicaciones.routes'));
router.use('/comentarios', require('./comentarios.routes'));
router.use('/reportes', require('./reportes.routes'));

module.exports = router;
