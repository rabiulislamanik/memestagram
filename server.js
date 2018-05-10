const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./config/db.js');

const test = require('./routes/api/test.js');
const users = require('./routes/api/users.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/test',test);
app.use('/users',users);

app.get('/',(req,res,err)=>{
  //console.log(db);
  db.query('SELECT * from users',(err,rows,fields)=>{
    if(!err){
      //console.log(rows);
      res.status(200).send(rows[0]);
    }
    else{
      res.send(err);
    }
  });
});


port = process.env.PORT || 3000 ;
app.listen(port ,()=>{
  console.log(`Server is running on port : ${port}`);
});
