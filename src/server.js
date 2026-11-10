const { port } = require('./config/env');
const pool = require('./config/db');
const app = require('./app');

(async () => {
  try {
    await pool.query('SELECT 1');
    console.log('Conectado a PostgreSQL');
    app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));
  } catch (err) {
    console.error('No se pudo conectar a PostgreSQL:', err.message);
    process.exit(1);
  }
})();
