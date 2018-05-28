const express = require('express');
const router = express.Router();
const passport = require('passport');
const db = require('../../config/db.js');

router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
  const errors={};
  //console.log(req.user.user_id);
  const query = `SELECT user_id,user_name,user_tag,profile_image_path,(select count(followed_by) from follower_relations where followed_user= ${db.escape(req.user.user_id)}) as followers,(select count(followed_by) from follower_relations where followed_by= ${db.escape(req.user.user_id)}) as following,(select count(post_id) from posts where user_id= ${db.escape(req.user.user_id)}) as number_of_posts from users  where user_id=${db.escape(req.user.user_id)}` ;
  db.query(query, (err,rows,field)=>{
    if(!err){
      if(!rows[0]){
        errors.profile ="No data found";
        return res.status(404).send(errors);
      }
      res.json(rows[0]);

    }
    else{
      res.status(400).send(err);
    }
  });

});

module.exports = router;
