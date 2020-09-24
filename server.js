var mysql = require('mysql');
const express = require ("express");
const bodyParser =require("body-parser");




var app = express();
app.use(bodyParser.json());


// Add the credentials to access your database
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',

    database : 'inventory'
});

connection.connect(err => {
  if (!err) { 
    console.log("DB Connection Succeeded");
  } else {
    console.log("DB Connection Failed");
  }
});

app.listen(2000, ()=>console.log('Express server is running'));

app.get('/items', (req, res)=> {

  mysqlConnection.query('SELECT  * FROM items', (err, rows, fields)=>{
    if (!err)
      res.send(rows);
    else
      console.log(err);
  })
});

//get an employees
app.get('/items/:id', (req, res)=> {

  mysqlConnection.query('SELECT  * FROM items where id = ?',[req.param.id],(err, rows, fields)=>{
    if (!err)
      res.send(rows[0].id);
    else
      console.log(err);
  })
});

//delete an employee
app.delete('/items/:id', (req, res)=> {

  mysqlConnection.query('DELETE FROM items where id = ?',[req.param.id],(err, rows, fields)=>{
    if (!err)
      res.send("Deleted Successfully. ");
    else
      console.log(err);
  })
});


//insert an employee
app.post('/items', (req, res)=> {
  let inv = req.body;
    var sql = "SET @id = ?; SET @name = ?; SET @qty =?; SET @amount = ?;\
     CALL itemsAddOrEdit(@id,@name,@qty,@amount);";

  mysqlConnection.query('sql, [inv.id, inv.name, inv.qty, inv.amount]',(err, rows, fields)=>{
    if (!err)
      rows.forEach(element=> {
        if(element/constructor == Array)
          res.send('Inserted id: ' + element[0].id;);

      });
    else
      console.log(err);
  })
});


//update an employee
app.put('/items', (req, res)=> {
  let inv = req.body;
    var sql = "SET @id = ?; SET @name = ?; SET @qty =?; SET @amount = ?;\
     CALL itemsAddOrEdit(@id,@name,@qty,@amount);";

  mysqlConnection.query('sql, [inv.id, inv.name, inv.qty, inv.amount]',(err, rows, fields)=>{
    if (!err)
      res.send('Updated Successfully');
    
      
    else
      console.log(err);
  })
});






