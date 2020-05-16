const mysql = require("mysql");

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sohaib123",
  database: "brainbuster",
});

conn.connect((err) => {
  if (err) throw err;
  console.log("Mysql Connected...");
});

module.exports = conn;
