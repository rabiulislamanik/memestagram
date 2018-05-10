const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../../config/db.js');

router.get('/:id',(req,res)=>{
  db.connect();
  db.query(`SELECT * from users where user_id = ${db.escape(req.params.id)}`,(err,rows,fields)=>{
    if(!err){
      //console.log(rows);
      res.status(200).send(rows[0]);
    }
    else{
      res.status(400).send(err);
    }
  });
});

router.post('/register',(req,res)=>{

  db.query(`SELECT * from users where user_email=${db.escape(req.body.email)}`,(err,rows,fields)=>{

    if(!err){
      //console.log(rows);
      if(rows[0]){
        res.status(400).send({alert:"Email already exists."});
      }
      else{
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                req.body.password=hash;
                db.query(`INSERT INTO users (user_name,user_email,user_password) VALUES (${db.escape(req.body.name)},${db.escape(req.body.email)},${db.escape(req.body.password)}) `,(err,rows,fields)=>{

                  if(!err){
                    res.status(200).send({alert : "Registered succesfully."});
                  }
                  else{
                    res.status(400).send({alert : "An error occured while Registering user." , err : err});
                  }
                });
            });
        });
      }
    }
    else{
      res.status(400).send(err);
    }
  });

});

module.exports=router;
