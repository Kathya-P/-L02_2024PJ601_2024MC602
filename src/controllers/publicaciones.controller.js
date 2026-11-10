const pool = require('../config/db');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

const columnas = '"publicacionId", "titulo", "descripcion", "usuarioId"';

exports.listar = asyncHandler(async (req, res) => {
  const { rows } = await pool.query(`SELECT ${columnas} FROM "publicaciones"`);
  res.json(rows);
});

exports.porUsuario = asyncHandler(async (req, res) => {
  const { rows } = await pool.query(
    `SELECT ${columnas} FROM "publicaciones" WHERE "usuarioId" = $1`,
    [req.params.usuarioId]
  );
  res.json(rows);
});

exports.obtener = asyncHandler(async (req, res) => {
  const { rows } = await pool.query(
    `SELECT ${columnas} FROM "publicaciones" WHERE "publicacionId" = $1`,
    [req.params.id]
  );
  if (!rows.length) throw new AppError('Publicación no encontrada', 404);
  res.json(rows[0]);
});

exports.crear = asyncHandler(async (req, res) => {
  const { publicacionId, titulo, descripcion, usuarioId } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO "publicaciones" ("publicacionId", "titulo", "descripcion", "usuarioId")
     VALUES ($1, $2, $3, $4) RETURNING ${columnas}`,
    [publicacionId, titulo, descripcion, usuarioId]
  );
  res.status(201).json(rows[0]);
});

exports.actualizar = asyncHandler(async (req, res) => {
  const { titulo, descripcion, usuarioId } = req.body;
  const { rows } = await pool.query(
    `UPDATE "publicaciones" SET "titulo" = $1, "descripcion" = $2, "usuarioId" = $3
     WHERE "publicacionId" = $4 RETURNING ${columnas}`,
    [titulo, descripcion, usuarioId, req.params.id]
  );
  if (!rows.length) throw new AppError('Publicación no encontrada', 404);
  res.json(rows[0]);
});

exports.eliminar = asyncHandler(async (req, res) => {
  const { rows } = await pool.query(
    'DELETE FROM "publicaciones" WHERE "publicacionId" = $1 RETURNING "publicacionId"',
    [req.params.id]
  );
  if (!rows.length) throw new AppError('Publicación no encontrada', 404);
  res.json(rows[0]);
});
