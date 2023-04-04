const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "students",
  password: "P@ssw0rd",
  port: 5432,
});

module.exports = pool;
