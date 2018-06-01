const express = require('express');
const router = express.Router();
const passport = require('passport');
const db = require('../../config/db.js');
const _ = require('lodash');
const multer  = require('multer');
const path = require('path');
//const upload = multer({ dest: 'uploads/' });
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
            console.log(err);
          }
        });
      }
  });

});

module.exports = router;
