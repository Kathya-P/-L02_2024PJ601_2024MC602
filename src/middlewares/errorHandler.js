const AppError = require('../utils/AppError');
const { nodeEnv } = require('../config/env');

const notFound = (req, res, next) => {
  next(new AppError(`Ruta no encontrada: ${req.method} ${req.originalUrl}`, 404));
};

const fromPgError = (err) => {
  switch (err.code) {
    case '23505':
      return new AppError('Ya existe un registro con un valor único repetido (por ejemplo, el correo)', 409, err.detail);
    case '23503':
      return new AppError(
        'Operación no permitida: viola una relación entre tablas',
        409,
        err.detail
      );
    case '23502':
      return new AppError('Falta un campo obligatorio', 400, err.column);
    case '23514':
      return new AppError('Un valor no cumple las reglas de la base de datos', 400, err.constraint);
    case '22P02':
      return new AppError('Formato de dato inválido', 400);
    default:
      return null;
  }
};

const errorHandler = (err, req, res, next) => {
  let error = err;

  if (err.code && typeof err.code === 'string') {
    error = fromPgError(err) || err;
  }
  if (err.type === 'entity.parse.failed') {
    error = new AppError('El JSON enviado es inválido', 400);
  }

  const statusCode = error.statusCode || 500;
  const response = {
    ok: false,
    status: statusCode,
    message: error.isOperational ? error.message : 'Error interno del servidor',
  };
  if (error.details) response.details = error.details;
  if (nodeEnv === 'development' && !error.isOperational) {
    response.debug = err.message;
  }

  if (statusCode >= 500) console.error(err);
  res.status(statusCode).json(response);
};

module.exports = { notFound, errorHandler };
