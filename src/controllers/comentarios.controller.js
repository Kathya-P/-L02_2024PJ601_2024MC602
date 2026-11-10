const pool = require('../config/db');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

const columnas = '"comentarioId", "publicacionId", "comentario", "usuarioId"';

exports.listar = asyncHandler(async (req, res) => {
  const { rows } = await pool.query(`SELECT ${columnas} FROM "comentarios"`);
  res.json(rows);
});

exports.porPublicacion = asyncHandler(async (req, res) => {
  const { rows } = await pool.query(
    `SELECT ${columnas} FROM "comentarios" WHERE "publicacionId" = $1`,
    [req.params.publicacionId]
  );
  res.json(rows);
});

exports.porUsuario = asyncHandler(async (req, res) => {
  const { rows } = await pool.query(
    `SELECT ${columnas} FROM "comentarios" WHERE "usuarioId" = $1`,
    [req.params.usuarioId]
  );
  res.json(rows);
});

exports.obtener = asyncHandler(async (req, res) => {
  const { rows } = await pool.query(
    `SELECT ${columnas} FROM "comentarios" WHERE "comentarioId" = $1`,
    [req.params.id]
  );
  if (!rows.length) throw new AppError('Comentario no encontrado', 404);
  res.json(rows[0]);
});

exports.crear = asyncHandler(async (req, res) => {
  const { comentarioId, publicacionId, comentario, usuarioId } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO "comentarios" ("comentarioId", "publicacionId", "comentario", "usuarioId")
     VALUES ($1, $2, $3, $4) RETURNING ${columnas}`,
    [comentarioId, publicacionId, comentario, usuarioId]
  );
  res.status(201).json(rows[0]);
});

exports.actualizar = asyncHandler(async (req, res) => {
  const { publicacionId, comentario, usuarioId } = req.body;
  const { rows } = await pool.query(
    `UPDATE "comentarios" SET "publicacionId" = $1, "comentario" = $2, "usuarioId" = $3
     WHERE "comentarioId" = $4 RETURNING ${columnas}`,
    [publicacionId, comentario, usuarioId, req.params.id]
  );
  if (!rows.length) throw new AppError('Comentario no encontrado', 404);
  res.json(rows[0]);
});

exports.eliminar = asyncHandler(async (req, res) => {
  const { rows } = await pool.query(
    'DELETE FROM "comentarios" WHERE "comentarioId" = $1 RETURNING "comentarioId"',
    [req.params.id]
  );
  if (!rows.length) throw new AppError('Comentario no encontrado', 404);
  res.json(rows[0]);
});
