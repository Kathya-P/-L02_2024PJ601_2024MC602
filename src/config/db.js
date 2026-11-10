const { Pool } = require('pg');
const { db } = require('./env');

const pool = new Pool(db);

pool.on('error', (err) => {
  console.error('Error inesperado en el pool de PostgreSQL:', err.message);
});

module.exports = pool;
