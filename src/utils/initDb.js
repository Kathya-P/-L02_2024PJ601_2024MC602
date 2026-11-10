const fs = require('fs');
const path = require('path');
const pool = require('../config/db');

(async () => {
  try {
    const sql = fs.readFileSync(path.join(__dirname, '../../database/schema.sql'), 'utf8');
    await pool.query(sql);
    console.log('Tablas creadas correctamente.');
  } catch (err) {
    console.error('Error creando las tablas:', err.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
})();
