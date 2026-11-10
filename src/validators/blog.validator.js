const { body, param, query } = require('express-validator');

const id = [param('id').isInt().withMessage('El id debe ser un entero')];
const usuarioId = body('usuarioId').isInt().withMessage('usuarioId debe ser un entero');
const publicacionId = body('publicacionId').isInt().withMessage('publicacionId debe ser un entero');
const filtroUsuario = [param('usuarioId').isInt().withMessage('usuarioId debe ser un entero')];
const filtroPublicacion = [param('publicacionId').isInt().withMessage('publicacionId debe ser un entero')];

const usuario = [
  body('usuarioId').isInt().withMessage('usuarioId es requerido'),
  body('rolId').isInt().withMessage('rolId es requerido'),
  body('nombreUsuario').trim().notEmpty().withMessage('nombreUsuario es requerido'),
  body('clave').trim().notEmpty().withMessage('clave es requerida'),
  body('nombre').trim().notEmpty().withMessage('nombre es requerido'),
  body('apellido').trim().notEmpty().withMessage('apellido es requerido'),
];

const publicacion = [
  body('publicacionId').isInt().withMessage('publicacionId es requerido'),
  body('titulo').trim().notEmpty().withMessage('titulo es requerido'),
  body('descripcion').trim().notEmpty().withMessage('descripcion es requerida'),
  usuarioId,
];

const comentario = [
  body('comentarioId').isInt().withMessage('comentarioId es requerido'),
  publicacionId,
  body('comentario').trim().notEmpty().withMessage('comentario es requerido'),
  usuarioId,
];

const filtrosUsuarios = [
  query('nombre').optional().trim(),
  query('apellido').optional().trim(),
  query('rolId').optional().isInt().withMessage('rolId debe ser un entero'),
];

const top = [query('n').isInt({ min: 1 }).withMessage('n debe ser un entero positivo').toInt()];

module.exports = {
  id, usuario, publicacion, comentario, filtroUsuario, filtroPublicacion, filtrosUsuarios, top,
};
