const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'Luis1587@',
  database: 'caribe_bloom'
});

module.exports = pool;