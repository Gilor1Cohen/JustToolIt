const mysql = require("mysql2");

const db = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "31032004Gg!",
    database: "BankAccounts",
    port: "3306",
  })
  .promise();

module.exports = db;
