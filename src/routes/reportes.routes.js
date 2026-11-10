const router = require('express').Router();
const ctrl = require('../controllers/reportes.controller');
const v = require('../validators/blog.validator');
const validate = require('../middlewares/validate');

router.get('/top-publicaciones', v.top, validate, ctrl.topPublicaciones);

module.exports = router;
