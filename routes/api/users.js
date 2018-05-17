const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../../config/db.js');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const keys= require('../../config/keys.js');

router.get('/current', passport.authenticate('jwt', { session: false }),(req, res)=> {
  res.json({
      user_id : req.user.user_id,
      user_name : req.user.user_name,
      user_email:req.user.user_email
  });
});

router.get('/:id',(req,res)=>{
  //db.connect();
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

//register
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

router.post('/login',(req,res)=>{
  const email =req.body.email;
  const password = req.body.password;
  db.query(`SELECT * from users where user_email=${db.escape(email)}` , (err,rows,field)=>{
    if(!err){
      if(!rows[0]){
        res.status(404).send({email: "Invalid User"});
      }
      else{
        bcrypt.compare(password,rows[0].user_password)
          .then(isMatched=>{
            if(isMatched){
              const payload = {id : rows[0].user_id , name: rows[0].user_name, profile_image : rows[0].profile_image_path};
              console.log(payload);
              //signing the token
              jwt.sign(payload , keys.secretkey , {expiresIn :3600} , (err,token)=>{
                res.json({
                  success : true ,
                  token : 'Bearer '+token
                });
              });
            }
            else{
              res.status(400).send({password : "Incorrect Password"});
            }
          })

      }
    }
    else{
      res.status(400).send(err);
    }
  });
});

module.exports=router;
