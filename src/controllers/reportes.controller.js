const pool = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

exports.topPublicaciones = asyncHandler(async (req, res) => {
  const { rows } = await pool.query(
    `SELECT p."publicacionId", p."titulo", COUNT(c."comentarioId")::int AS "cantidadComentarios"
     FROM "publicaciones" p
     LEFT JOIN "comentarios" c ON c."publicacionId" = p."publicacionId"
     GROUP BY p."publicacionId", p."titulo"
     ORDER BY "cantidadComentarios" DESC
     LIMIT $1`,
    [req.query.n]
  );
  res.json(rows);
});
