const mysql = require('mysql') 

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'vagrant',
  database: 'test'
});

conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!")
  var sql = "CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";
  conn.query(sql, function (err) {
    if (err) throw err;
    console.log("Table created");
  });
});
module.exports = conn;
