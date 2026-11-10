const { validationResult } = require('express-validator');
const AppError = require('../utils/AppError');

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const details = errors.array().map((e) => ({ campo: e.path, mensaje: e.msg }));
    return next(new AppError('Error de validación', 400, details));
  }
  next();
};
