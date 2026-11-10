const pool = require('../config/db');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

const columnas = '"usuarioId", "rolId", "nombreUsuario", "clave", "nombre", "apellido"';

exports.listar = asyncHandler(async (req, res) => {
  const valores = [];
  const condiciones = [];
  if (req.query.nombre) {
    valores.push(`%${req.query.nombre}%`);
    condiciones.push(`"nombre" ILIKE $${valores.length}`);
  }
  if (req.query.apellido) {
    valores.push(`%${req.query.apellido}%`);
    condiciones.push(`"apellido" ILIKE $${valores.length}`);
  }
  if (req.query.rolId) {
    valores.push(req.query.rolId);
    condiciones.push(`"rolId" = $${valores.length}`);
  }
  const where = condiciones.length ? `WHERE ${condiciones.join(' AND ')}` : '';
  const { rows } = await pool.query(`SELECT ${columnas} FROM usuarios ${where}`, valores);
  res.json(rows);
});

exports.obtener = asyncHandler(async (req, res) => {
  const { rows } = await pool.query(`SELECT ${columnas} FROM "usuarios" WHERE "usuarioId" = $1`, [req.params.id]);
  if (!rows.length) throw new AppError('Usuario no encontrado', 404);
  res.json(rows[0]);
});

exports.crear = asyncHandler(async (req, res) => {
  const { usuarioId, rolId, nombreUsuario, clave, nombre, apellido } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO "usuarios" ("usuarioId", "rolId", "nombreUsuario", "clave", "nombre", "apellido")
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING ${columnas}`,
    [usuarioId, rolId, nombreUsuario, clave, nombre, apellido]
  );
  res.status(201).json(rows[0]);
});

exports.actualizar = asyncHandler(async (req, res) => {
  const { rolId, nombreUsuario, clave, nombre, apellido } = req.body;
  const { rows } = await pool.query(
    `UPDATE "usuarios" SET "rolId" = $1, "nombreUsuario" = $2, "clave" = $3, "nombre" = $4, "apellido" = $5
     WHERE "usuarioId" = $6 RETURNING ${columnas}`,
    [rolId, nombreUsuario, clave, nombre, apellido, req.params.id]
  );
  if (!rows.length) throw new AppError('Usuario no encontrado', 404);
  res.json(rows[0]);
});

exports.eliminar = asyncHandler(async (req, res) => {
  const { rows } = await pool.query(
    'DELETE FROM "usuarios" WHERE "usuarioId" = $1 RETURNING "usuarioId"',
    [req.params.id]
  );
  if (!rows.length) throw new AppError('Usuario no encontrado', 404);
  res.json(rows[0]);
});
