const { Sequelize } = require("sequelize");
const db = new Sequelize("dans", "root", "", {
   host: "localhost",
   dialect:
      "mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
});

module.exports = db;
