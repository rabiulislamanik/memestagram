const express = require('express');
const app = express();

const db = require('./config/db.js');

app.get('/',(req,res,err)=>{
  console.log(db);
  db.connect();
  db.query('SELECT * from users where user_id=81',(err,rows,fields)=>{
    if(!err){
      console.log(rows);
      res.status(200).send(rows[0]['user_id'].toString());
    }
    else{
      res.send(err);
    }
  });
  db.end();
});

port = process.env.PORT || 3000 ;
app.listen(port ,()=>{
  console.log(`Server is running on port : ${port}`);
});
