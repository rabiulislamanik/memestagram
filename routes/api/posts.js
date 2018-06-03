const express = require('express');
const router = express.Router();
const passport = require('passport');
const db = require('../../config/db.js');
const _ = require('lodash');
const multer  = require('multer');
const path = require('path');
//const upload = multer({ dest: 'uploads/' });
const validatePostInput = require('../../validation/posts.js');


const storage = multer.diskStorage({
  destination : 'uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
  }
})

const upload = multer({
  storage: storage ,
  limits : {fileSize:2000000},
  fileFilter : function(req,file,cb){
    validateFile(file,cb);
  }
}).single('photo');

function validateFile(file,cb){
  const filetypes = /png|jpg|jpeg|gif/;
  const isExtNameValid = filetypes.test(path.extname(file.originalname.toLowerCase()));
  const isMimeTypeValid = filetypes.test(file.mimetype);
  // console.log(isExtNameValid);
  // console.log(file.mimetype);
  // console.log(isMimeTypeValid);
  if (isExtNameValid && isMimeTypeValid){
    cb(null, true);
  }
  else{
    cb('Please upload images only.');
  }
}

router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
  upload(req, res, function (err) {
      if (err) {
        // An error occurred when uploading
        return res.status(400).send({file : err});
      }
      else{
        //no error
        //console.log(req.file);
        //console.log(req.file.filename);
        if(req.file==undefined){
          return res.status(400).send({file : "Please select a file."});
        }
        req.body.post_text = _.isEmpty( req.body.post_text) ? '' :  req.body.post_text ;
        const user_id = req.user.user_id;
        const post_text = req.body.post_text;
        const post_image_link =req.file.filename ;
        const query = `INSERT INTO posts (user_id,post_text,post_image_link) VALUES (${db.escape(user_id)},${db.escape(post_text)},${db.escape(post_image_link)}) `;

        db.query(query,(err,rows,fields)=>{

          if(!err){
            res.status(200).send({post : "post created."});
          }
          else{
            res.status(400).send({alert : "An error occured while creating the post."});
            // console.log(err);
          }
        });
      }
  });

});

router.get('/:user_id',(req,res)=>{
  const query = `SELECT post_id,user_id,post_text,post_image_link,posting_time,(SELECT count(user_id) from hahas where hahas.post_id =posts.post_id) as likes,(SELECT count(comment_text) from comments where comments.post_id =posts.post_id) as comments from posts where user_id =${db.escape(req.params.user_id)}`;
  db.query(query,(err,rows,fields)=>{
    if(!err){
      res.status(200).send(rows);
    }
    else{
      res.status(400).send({posts: "An error occured while fetching the posts."});
      console.log(err);
    }
  });
});

router.delete('/:post_id',passport.authenticate('jwt',{session:false}),(req,res)=>{
  db.query(`SELECT post_id,user_id from posts where post_id=${db.escape(req.params.post_id)}`,(err,rows,fields)=>{
    if(!err){
      if(rows[0].user_id != req.user.user_id){
        res.status(400).send({notauthorized: "User not authorized for this action."});
      }
      else{
        db.query(`DELETE from posts where post_id=${db.escape(req.params.post_id)}`,(err,rows,fields)=>{
          if(!err){
            res.status(200).send({success:true});
          }
          else{
            res.status(400).send({posts: "An error occured while deleting the posts.",dberr:err});
          }

        });
      }
    }
    else{
      res.status(400).send({posts: err});
    }
  });
});

router.post('/like/:post_id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    db.query(`SELECT post_id,user_id from hahas where post_id=${db.escape(req.params.post_id)} and user_id=${db.escape(req.user.user_id)}`,(err,rows,fields)=>{
      if(!err){
        //console.log(rows);
        if(rows.length == 0){
          db.query(`INSERT into hahas(post_id,user_id) VALUES(${db.escape(req.params.post_id)},${db.escape(req.user.user_id)})`,(err,rows,fields)=>{
            if(!err){
              res.status(200).send({like :'liked the post.'});
            }
            else{
              res.status(400).send({like: "An error occured while liking the post.",dberr:err});
            }

          });
        }
        else{
          db.query(`DELETE from hahas where post_id=${db.escape(req.params.post_id)} and user_id=${db.escape(req.user.user_id)}`,(err,rows,fields)=>{
            if(!err){
              res.status(200).send({like:'unliked the post.'});
            }
            else{
              res.status(400).send({like: "An error occured while unliking the posts.",dberr:err});
            }

          });
        }
      }
      else{
        res.status(400).send({dberror: err});
      }
    });
});

router.get('/like/:post_id',passport.authenticate('jwt',{session:false}),(req,res)=>{
  db.query(`SELECT user_id,(SELECT user_name from users where users.user_id =hahas.user_id) as likers,(SELECT profile_image_path from users where users.user_id =hahas.user_id) as likers_profile_image from hahas where post_id=${db.escape(req.params.post_id)}`,(err,rows,fields)=>{
    if(!err){
      res.status(200).send({likes : rows});
    }
    else{
      res.status(400).send({likes: "An error occured while fething the list of likers.",dberr:err});
    }
  });
});

router.post('/comment/:post_id',passport.authenticate('jwt',{session:false}),(req,res)=>{
  const {errors,isValid} = validatePostInput(req.body);
  if(!isValid){
    //console.log(errors);
    return res.status(400).send(errors);
  }
  db.query(`INSERT into comments(post_id,comment_text,user_id) VALUES(${db.escape(req.params.post_id)},${db.escape(req.body.comment_text)},${db.escape(req.user.user_id)})`,(err,rows,fields)=>{
    if(!err){
      res.status(200).send({comment : 'Commented on the post.'});
    }
    else{
      res.status(400).send({comment: "An error occured while commenting on the post.",dberr:err});
    }
  });
});

router.delete('/comment/:comment_id',passport.authenticate('jwt',{session:false}),(req,res)=>{

  db.query(`SELECT comment_id,post_id,user_id from comments where comment_id=${db.escape(req.params.comment_id)}`,(err,rows,fields)=>{
    if(!err){
      if (rows.length ==0){
        res.status(400).send({comment: "Comment deleted/doesn't exist."});
      }
      else if(rows[0].user_id != req.user.user_id){
        res.status(400).send({notauthorized: "User not authorized for this action."});
      }
      else{
        db.query(`DELETE from comments where comment_id=${db.escape(req.params.comment_id)}`,(err,rows,fields)=>{
          if(!err){
            res.status(200).send({success:true});
          }
          else{
            res.status(400).send({comment: "An error occured while deleting the comment.",dberr:err});
          }

        });
      }
    }
    else{
      res.status(400).send({comment: err});
    }
  });
});

router.get('/comment/:post_id',passport.authenticate('jwt',{session:false}),(req,res)=>{
  db.query(`SELECT comment_text,(SELECT user_name from users where users.user_id =comments.user_id) as commenters,(SELECT profile_image_path from users where users.user_id =comments.user_id) as commenters_profile_image from comments where post_id=${db.escape(req.params.post_id)}`,(err,rows,fields)=>{
    if(!err){
      res.status(200).send({comments : rows});
    }
    else{
      res.status(400).send({comments: "An error occured while fething the comments.",dberr:err});
    }
  });
});

module.exports = router;
