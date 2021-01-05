const mysql = require('mysql');
const express = require('express');
const hbs = require ('hbs');
const bodyParser = require('body-parser');
const dt = require('./crud/deleteTable');
const db = require('./crud/database');
const path = require('path');
const app = express ();

//create connecttion to database
var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "vagrant",
  database: "test"
});


// insert data 
conn.connect(function(err) {
  if(err) throw err;
  console.log('connected')

  var sql = "INSERT INTO customers (name, address) VALUES ?";
  var values = [
     ['John', 'Highway 71'],
    ['Peter', 'Lowstreet 4'],
    ['Amy', 'Apple st 652'],
    ['Hannah', 'Mountain 21']
  ];
  conn.query(sql, [values], function(err, result) {
    if(err) throw err;
    console.log("number of records inserted: ")
  });
});
// set view file
app.set('views', path.join(__dirname, 'views'))

//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// set public folder as static folder 
app.use('/assets', express.static(__dirname + '/public'));
//route for homepage 
app.get('/',(req, res) => {
  let sql = "SELECT * FROM customers";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('customer_view',{
      results: results
    });
  });
});

//route for insert data
app.post('/save', function(req, res) {
  let data = {customer_name: req.body.customers_name, customers_address: req.body.customers_id};
  var sql = "INSERT INTO customers SET ?";
  var query = conn.query(sql, data, function(err, results) {
    if(err) throw err;
    res.redirect('/');
  });
});
//route for update data
app.post('/update', function(req, res) {
  var sql = "UPDATE customers SET address='"+req.body.customers_address+"', customers_name '"+req.body.customers_name+"' WHERE id='"+req.body.id; 
  var query = conn.query(sql, function(err, results) {
    if(err) throw err;
      res.redirect('/');
  });
});

//route for delete data
app.post('/delete', function(req, res) {
  let sql = "DELETE FROM customers WHERE customers_id="+req.body.product_id+"";
  let query = conn.query(sql, function(err, results) {
    if(err) throw err;
      res.redirect('/');
  });
});

// create server
app.listen(5000, function() {
  console.log("server connected");
}); 
 
